'use server'

import type Stripe from 'stripe'
import {z} from 'zod'
import {env} from '~/env'
import {COLLECTION_SLUG} from '~/payload/config'
import type {Order} from '~/payload/payload-types'
import {getPayload} from '~/payload/utils/get-payload'
import {auth} from '~/shared/lib/auth'
import {EmailType, sendEmail} from '~/shared/lib/email'
import {InActionsError, PayloadNotConfiguredError} from '~/shared/lib/errors'
import {stripe} from '~/shared/lib/stripe/stripe'

const productSchema = z.object({
	product: z.number().min(1),
	quantity: z.number().min(1),
})
const checkoutOptionsSchema = z.object({
	paymentMethod: z.enum(['inStore', 'card', 'b2b', 'other']),
	store: z.number().min(1),
	date: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) {
			return new Date(arg)
		}
		return arg
	}, z.date().min(new Date())),
})
const userInfoSchema = z.object({
	name: z.string().min(1, 'Meno je povinné'),
	email: z.string().email('Zadajte platnú e-mailovú adresu'),
	phone: z.string().min(10, 'Telefónne číslo je povinné'),
	terms: z.literal(true, {
		errorMap: () => ({message: 'Musíte prijať podmienky používania'}),
	}),
})
type UserData = z.infer<typeof userInfoSchema>
const checkoutSchema = z.object({
	products: z.array(productSchema),
	options: checkoutOptionsSchema,
	user: userInfoSchema,
})

type CheckoutData = z.infer<typeof checkoutSchema>

interface StripeProductData {
	productId: number
	quantity: number
	priceId: string
}

const createStripeSession = async (
	stripeProducts: StripeProductData[],
	order: Order,
	user: UserData,
): Promise<{url: string | null}> => {
	const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
		stripeProducts.map((product) => ({
			price: product.priceId,
			quantity: product.quantity,
			adjustable_quantity: {enabled: false},
		}))

	const successUrl = new URL(`${env.NEXT_PUBLIC_SERVER_URL}/checkout`)
	successUrl.searchParams.append('success', 'true')
	successUrl.searchParams.append('orderId', String(order.id))

	const cancelUrl = new URL(`${env.NEXT_PUBLIC_SERVER_URL}/cart`)

	try {
		const paymentSession = await stripe.checkout.sessions.create({
			payment_method_types: ['card', 'mobilepay'],
			line_items: lineItems,
			mode: 'payment',
			success_url: successUrl.toString(),
			cancel_url: cancelUrl.toString(),
			metadata: {
				userInfo: user.email,
				orderId: String(order.id),
			},
		})

		await Promise.all([
			sendAdminMail(order, user),
			sendEmail(
				EmailType.ORDER,
				user.email,
				'Ďakujeme za vašu objednávku! Vaša faktúra. (Platba Kartou)',
				'Objednávka bola vytvorená',
			),
		])

		return {url: paymentSession.url}
	} catch (error) {
		console.error('[CHECKOUT ACTIONS]: Failed to create Stripe session', error)
		return {url: null}
	}
}

const createInStoreSession = async (
	order: Order,
	user: UserData,
): Promise<{url: string | null}> => {
	const successUrl = new URL(`${env.NEXT_PUBLIC_SERVER_URL}/checkout`)
	successUrl.searchParams.append('success', 'true')
	successUrl.searchParams.append('orderId', String(order.id))

	try {
		await Promise.all([
			sendEmail(
				EmailType.ORDER,
				user.email,
				'Ďakujeme za vašu objednávku! Vaša faktúra. (Platba pri prevzatí)',
				'Objednávka bola vytvorená',
			),
			sendAdminMail(order, user),
		])

		return {url: successUrl.toString()}
	} catch (error) {
		console.error('[CHECKOUT ACTIONS]: Failed to create inStore session', error)
		return {url: null}
	}
}

const sendAdminMail = async (order: Order, user: UserData): Promise<void> => {
	const orderConfirmEmails = ['nicopresov@gmail.com', 'kromka@kavejo.sk']

	await sendEmail(
		EmailType.ORDER,
		orderConfirmEmails,
		`Informácie o objednávkach KROMKA(admin) - Nová objednávka - ${order.id}`,
		'Objednávка bola vytvorená',
	)
}

export const getCheckoutSession = async (
	data: CheckoutData,
): Promise<{url: string | null}> => {
	try {
		const validationResult = checkoutSchema.safeParse(data)
		if (!validationResult.success) {
			throw new InActionsError(
				'CHECKOUT',
				`Invalid input: ${JSON.stringify(validationResult.error.flatten().fieldErrors)}`,
			)
		}

		const {products, options, user} = validationResult.data

		if (products.length === 0) {
			throw new InActionsError('CHECKOUT', 'Products not found (getCheckout)')
		}

		const payload = await getPayload()
		if (!payload) throw new PayloadNotConfiguredError()

		const productIds = products.map(({product}) => product)

		// Получаем данные продуктов
		const {docs: items} = await payload.find({
			collection: COLLECTION_SLUG.PRODUCTS,
			where: {id: {in: productIds}},
			depth: 2,
		})

		const filteredItems = items.filter((item) => Boolean(item.priceId))

		if (filteredItems.length === 0) {
			throw new InActionsError('CHECKOUT', 'No valid items found for checkout.')
		}

		const totalPrice = filteredItems.reduce((total, item) => {
			const productData = products.find((p) => p.product === item.id)
			const quantity = productData?.quantity ?? 1

			if (typeof item.price !== 'number') {
				throw new InActionsError(
					'CHECKOUT',
					`Missing price for item ${item.id}`,
				)
			}

			return total + item.price * quantity
		}, 0)

		const session = await auth()
		const authUserId = session?.user.id
		const guestInfo = !authUserId
			? {name: user.name, email: user.email, phone: user.phone}
			: undefined

		const orderProducts = filteredItems.map((item) => {
			const productData = products.find((p) => p.product === item.id)
			const quantity = productData?.quantity ?? 1

			return {productId: item.id, quantity}
		})

		// === Начало логики контроля инвентаря ===

		// Получаем записи инвентаря
		const inventoryRecords = await payload.find({
			collection: COLLECTION_SLUG.INVENTORY,
			where: {
				and: [
					{
						product: {
							in: orderProducts.map((item) => item.productId),
						},
					},
					{
						store: {
							equals: options.store,
						},
					},
					{
						date: {
							equals: options.date.toISOString().split('T')[0],
						},
					},
				],
			},
			limit: 100,
		})

		// Создаем карту записей инвентаря
		const inventoryMap = new Map()
		for (const record of inventoryRecords.docs) {
			const key = `${record.product}-${record.store}-${record.date}`
			inventoryMap.set(key, record)
		}

		// Проверяем доступность товаров
		for (const item of orderProducts) {
			const key = `${item.productId}-${options.store}-${options.date.toISOString().split('T')[0]}`
			const inventoryRecord = inventoryMap.get(key)

			if (!inventoryRecord) {
				throw new InActionsError(
					'CHECKOUT',
					`Товар с ID ${item.productId} недоступен в выбранном магазине на выбранную дату.`,
				)
			}

			if (inventoryRecord.quantity < item.quantity) {
				throw new InActionsError(
					'CHECKOUT',
					`Недостаточное количество товара с ID ${item.productId} в выбранном магазине на выбранную дату. Доступно: ${inventoryRecord.quantity}, запрошено: ${item.quantity}.`,
				)
			}
		}

		// === Конец логики контроля инвентаря ===

		// Создаем заказ
		const order = await payload.create({
			collection: COLLECTION_SLUG.ORDERS,
			data: {
				createdBy: authUserId || null,
				guestInfo,
				status: 'pending',
				paymentMethod: options.paymentMethod,
				paymentStatus: 'pending',
				_isPaid: false,
				products: orderProducts.map(({productId, quantity}) => ({
					product: productId,
					quantity,
				})),
				subtotal: totalPrice,
				discount: 0,
				totalPrice,
				pickupStore: options.store,
				pickupDate: options.date.toISOString().split('T')[0],
				notes: '',
			},
		})

		// Обновляем инвентарь
		for (const item of orderProducts) {
			const key = `${item.productId}-${options.store}-${options.date.toISOString().split('T')[0]}`
			const inventoryRecord = inventoryMap.get(key)

			const newQuantity = inventoryRecord.quantity - item.quantity

			await payload.update({
				collection: COLLECTION_SLUG.INVENTORY,
				id: inventoryRecord.id,
				data: {
					quantity: newQuantity,
					...(newQuantity === 0 && {status: 'unavailable'}),
				},
			})
		}

		// Продолжаем обработку платежа
		switch (options.paymentMethod) {
			case 'card': {
				const stripeProducts: StripeProductData[] = filteredItems.map(
					(item) => {
						const productData = products.find((p) => p.product === item.id)
						const quantity = productData?.quantity ?? 1

						if (!item.priceId) {
							throw new InActionsError(
								'CHECKOUT',
								`Missing priceId for item ${item.id}`,
							)
						}

						return {
							productId: item.id,
							quantity,
							priceId: item.priceId,
						}
					},
				)

				return await createStripeSession(stripeProducts, order, user)
			}

			case 'inStore':
				return await createInStoreSession(order, user)

			default:
				throw new InActionsError(
					'CHECKOUT',
					`Unsupported payment method: ${options.paymentMethod}`,
				)
		}
	} catch (error) {
		console.error(
			'[CHECKOUT ACTIONS]: Failed to get checkout (getCheckout)',
			error,
		)
		throw new InActionsError('CHECKOUT', 'Failed to get checkout (getCheckout)')
	}
}
