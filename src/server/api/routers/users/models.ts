import {z} from 'zod'
import {addressSchema} from '../addresses/models'
import {storeSchema} from '../stores/validators'

export const userSchema = z.object({
	role: z.enum(['admin', 'user', 'editor', 'b2b']),
	phone: z.string().nullable().optional(),
	addresses: z
		.array(
			z.object({
				address: z.union([z.number(), addressSchema]),
				id: z.string().nullable().optional(),
			}),
		)
		.nullable()
		.optional(),
	preferences: z
		.object({
			preferedStore: z
				.union([z.number(), z.null(), storeSchema])
				.nullable()
				.optional(),
			preferedPaymentMethod: z.enum(['store', 'card']).nullable().optional(),
		})
		.optional(),
	acceptedTerms: z.boolean(),
	acceptedMailNotifications: z.boolean().nullable().optional(),
	email: z.string().email(),
	name: z.string().nullable().optional(),
	image: z.string().nullable().optional(),
})
