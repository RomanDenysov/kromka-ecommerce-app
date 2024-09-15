import {z} from 'zod'

export const userInfoSchema = z.object({
	name: z.string().min(1, 'Meno je povinné'),
	email: z.string().email('Zadajte platnú e-mailovú adresu'),
	phone: z.string().min(10, 'Telefónne číslo je povinné'),
	terms: z
		.boolean()
		.default(false)
		.refine((data) => data === true, {
			message: 'Musíte prijať podmienky používania',
			path: ['terms'],
		}),
})

export type UserInfoFormData = z.infer<typeof userInfoSchema>

export const checkoutSchema = z
	.object({
		user: userInfoSchema,
		paymentMethod: z.enum(['inStore', 'card', 'stripe']),
		deliveryMethod: z.enum(['pickup', 'delivery']),
		deliveryAddress: z
			.object({
				street: z.string().min(1, 'Ulica je povinná'),
				city: z.string().min(1, 'Mesto je povinné'),
				zip: z.string().min(1, 'PSČ je povinné'),
				country: z.string().min(1, 'Krajina je povinná'),
			})
			.optional(),
		store: z.object({
			name: z.string().min(1, 'Názov obchodu je povinný'),
			address: z
				.object({
					street: z.string().min(1, 'Ulica je povinná'),
					city: z.string().min(1, 'Mesto je povinné'),
					zip: z.string().min(1, 'PSČ je povinné'),
					country: z.string().min(1, 'Krajina je povinná'),
				})
				.optional(),
		}),
		pickupDate: z
			.date({
				required_error: 'Dátum vyzdvihnutia je povinný',
				invalid_type_error: 'Neplatný dátum vyzdvihnutia',
			})
			.optional(),
	})
	.refine(
		(data) =>
			data.paymentMethod === 'inStore' || data.deliveryMethod === 'pickup',
		{
			message: 'Musíte vybrať spôsob doručenia',
			path: ['deliveryMethod'],
		},
	)

export type CheckoutFormData = z.infer<typeof checkoutSchema>
