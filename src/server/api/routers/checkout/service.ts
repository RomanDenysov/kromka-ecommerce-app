import 'server-only'
import type Stripe from 'stripe'
import {env} from '~/env'
import {auth} from '~/server/auth'
import {COLLECTION_SLUG} from '~/server/payload/config'
import type {Order, Product} from '~/server/payload/payload-types'
import {getPayload} from '~/server/payload/utils/get-payload'
import {EmailType, sendEmail} from '~/shared/lib/email'
import {InActionsError, PayloadNotConfiguredError} from '~/shared/lib/errors'
import {stripe} from '~/shared/lib/stripe/stripe'
import type {CheckoutData, CustomerInfo, StripeProductData} from './models'

// Function to fetch products and calculate total price
const fetchProducts = async (
	products: {product: number; quantity: number}[],
) => {
	const payload = await getPayload()
	if (!payload) throw new PayloadNotConfiguredError()

	const productIds = products.map(({product}) => product)

	const {docs: items} = await payload.find({
		collection: COLLECTION_SLUG.PRODUCTS,
		where: {id: {in: productIds}},
		depth: 2,
	})

	if (items.length === 0) {
		throw new InActionsError('CHECKOUT', 'No valid items found for checkout.')
	}

	return items
}

// Function to calculate total price and prepare order products
const calculateTotalPrice = (
	items: Product[],
	products: {product: number; quantity: number}[],
) => {
	let totalPrice = 0
	const orderProducts: {
		productId: number
		quantity: number
		priceId?: string
	}[] = []

	for (const item of items) {
		const productData = products.find((p) => p.product === item.id)
		const quantity = productData?.quantity ?? 1

		if (typeof item.price !== 'number') {
			throw new InActionsError('CHECKOUT', `Missing price for item ${item.id}`)
		}

		totalPrice += item.price * quantity

		orderProducts.push({
			productId: item.id,
			quantity,
			priceId: item.priceId || '', // Include priceId for Stripe
		})
	}

	return {totalPrice, orderProducts}
}

// Function to get user info
const getUserInfo = async (user: CustomerInfo) => {
	const session = await auth()
	const authUserId = session?.user.id
	const guestInfo = !authUserId
		? {name: user.name, email: user.email, phone: user.phone, terms: user.terms}
		: undefined

	return {authUserId, guestInfo}
}

// Function to check inventory
const checkInventory = async (
	orderProducts: {productId: number; quantity: number}[],
	options: {store: number; date: Date},
) => {
	const payload = await getPayload()
	if (!payload) throw new PayloadNotConfiguredError()

	const {docs: inventoryRecords} = await payload.find({
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

	// Create a map for quick lookup
	const inventoryMap = new Map()
	for (const record of inventoryRecords) {
		const key = `${record.product}-${record.store}-${record.date}`
		inventoryMap.set(key, record)
	}

	// Check availability
	for (const item of orderProducts) {
		const key = `${item.productId}-${options.store}-${options.date.toISOString().split('T')[0]}`
		const inventoryRecord = inventoryMap.get(key)

		if (!inventoryRecord) {
			throw new InActionsError(
				'CHECKOUT',
				`Product ID ${item.productId} is not available in the selected store on the selected date.`,
			)
		}

		if (inventoryRecord.quantity < item.quantity) {
			throw new InActionsError(
				'CHECKOUT',
				`Insufficient quantity for product ID ${item.productId} in the selected store on the selected date. Available: ${inventoryRecord.quantity}, requested: ${item.quantity}.`,
			)
		}
	}

	return inventoryMap
}

// Function to create order
const createOrder = async (
	data: CheckoutData,
	authUserId: string | undefined,
	guestInfo: CustomerInfo | undefined,
	orderProducts: {productId: number; quantity: number}[],
	totalPrice: number,
) => {
	const payload = await getPayload()
	if (!payload) throw new PayloadNotConfiguredError()

	const order = await payload.create({
		collection: COLLECTION_SLUG.ORDERS,
		data: {
			createdBy: authUserId || null,
			guestInfo,
			status: 'pending',
			paymentMethod: data.options.paymentMethod,
			paymentStatus: 'pending',
			_isPaid: false,
			products: orderProducts.map(({productId, quantity}) => ({
				product: productId,
				quantity,
			})),
			subtotal: totalPrice,
			discount: 0,
			totalPrice,
			pickupStore: data.options.store,
			pickupDate: data.options.date.toISOString().split('T')[0],
			notes: '',
		},
	})

	return order
}

// Function to update inventory
const updateInventory = async (
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	inventoryMap: Map<string, any>,
	orderProducts: {productId: number; quantity: number}[],
	options: {store: number; date: Date},
) => {
	const payload = await getPayload()
	if (!payload) throw new PayloadNotConfiguredError()

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
}

// Function to send email notifications
const sendNotifications = async (
	order: Order,
	user: CustomerInfo,
	paymentMethod: string,
) => {
	const orderConfirmEmails = ['admin@example.com', 'sales@example.com'] // Replace with actual emails

	const userEmailSubject =
		paymentMethod === 'card'
			? 'Ďakujeme za vašu objednávku! Vaša faktúra. (Platba Kartou)'
			: 'Ďakujeme za vašu objednávku! Vaša faktúra. (Platba pri prevzatí)'

	await Promise.all([
		sendEmail(
			EmailType.ORDER,
			user.email,
			userEmailSubject,
			'Objednávka bola vytvorená',
		),
		sendEmail(
			EmailType.ORDER,
			orderConfirmEmails,
			`Informácie o objednávkach - Nová objednávka - ${order.id}`,
			'Objednávka bola vytvorená',
		),
	])
}

// Function to create Stripe session
const createStripeSession = async (
	stripeProducts: StripeProductData[],
	order: Order,
	user: CustomerInfo,
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

		return {url: paymentSession.url}
	} catch (error) {
		console.error('[CHECKOUT ACTIONS]: Failed to create Stripe session', error)
		return {url: null}
	}
}

// Function to handle in-store payment
const createInStoreSession = async (
	order: Order,
): Promise<{url: string | null}> => {
	const successUrl = new URL(`${env.NEXT_PUBLIC_SERVER_URL}/checkout`)
	successUrl.searchParams.append('success', 'true')
	successUrl.searchParams.append('orderId', String(order.id))

	return {url: successUrl.toString()}
}

// Main function
export const getCheckoutSession = async (
	data: CheckoutData,
): Promise<{url: string | null}> => {
	try {
		// Step 1: Fetch Products
		const items = await fetchProducts(data.products)

		// Step 2: Calculate Total Price and Prepare Order Products
		const {totalPrice, orderProducts} = calculateTotalPrice(
			items,
			data.products,
		)

		// Step 3: Get User Info
		const {authUserId, guestInfo} = await getUserInfo(data.user)

		// Step 4 Check Inventory
		const inventoryMap = await checkInventory(orderProducts, data.options)

		// Step 5: Create Order
		const order = await createOrder(
			data,
			authUserId,
			guestInfo,
			orderProducts,
			totalPrice,
		)

		// Step 6: Update Inventory
		await updateInventory(inventoryMap, orderProducts, data.options)

		// Step 7: Process Payment
		switch (data.options.paymentMethod) {
			case 'card': {
				// Prepare Stripe products
				const stripeProducts: StripeProductData[] = orderProducts.map(
					(item) => {
						const product = items.find((p) => p.id === item.productId)
						if (!product) {
							throw new InActionsError(
								'CHECKOUT',
								`Product ID ${item.productId} not found`,
							)
						}
						if (typeof product.priceId !== 'string') {
							throw new InActionsError(
								'CHECKOUT',
								`Missing priceId for item ${product.id}`,
							)
						}
						return {
							productId: item.productId,
							quantity: item.quantity,
							priceId: product.priceId,
						}
					},
				)

				const paymentSession = await createStripeSession(
					stripeProducts,
					order,
					data.user,
				)

				// Step 8: Send Notifications
				await sendNotifications(order, data.user, 'card')

				return paymentSession
			}

			case 'inStore': {
				const sessionUrl = await createInStoreSession(order)

				// Step 8: Send Notifications
				await sendNotifications(order, data.user, 'inStore')

				return sessionUrl
			}

			default:
				throw new InActionsError(
					'CHECKOUT',
					`Unsupported payment method: ${data.options.paymentMethod}`,
				)
		}
	} catch (error) {
		console.error('[CHECKOUT ACTIONS]: Failed to get checkout session', error)
		throw new InActionsError('CHECKOUT', 'Failed to get checkout session')
	}
}
