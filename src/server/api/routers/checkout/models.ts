import {z} from 'zod'

export const checkoutProductSchema = z.object({
	product: z.number().min(1),
	quantity: z.number().min(1).max(50),
})

export const checkoutOptionsSchema = z.object({
	paymentMethod: z.enum(['inStore', 'card', 'b2b', 'other']),
	store: z.number().min(1),
	date: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) {
			return new Date(arg)
		}
		return arg
	}, z.date().min(new Date())),
})

export const customerInfoSchema = z.object({
	name: z.string().min(1, 'Meno je povinné'),
	email: z.string().email('Zadajte platnú e-mailovú adresu'),
	phone: z.string().min(10, 'Telefónne číslo je povinné'),
	terms: z.literal(true, {
		errorMap: () => ({message: 'Musíte prijať podmienky používania'}),
	}),
})

export const checkoutSchema = z.object({
	products: z.array(checkoutProductSchema),
	options: checkoutOptionsSchema,
	user: customerInfoSchema,
})

export type CheckoutProduct = z.infer<typeof checkoutProductSchema>
export type CheckoutOptions = z.infer<typeof checkoutOptionsSchema>
export type CustomerInfo = z.infer<typeof customerInfoSchema>
export type CheckoutData = z.infer<typeof checkoutSchema>

export type StripeProductData = {
	productId: number
	quantity: number
	priceId: string
}
