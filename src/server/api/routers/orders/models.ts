import {z} from 'zod'
import {productSchema} from '../products/models'
import {storeSchema} from '../stores/validators'
import {userSchema} from '../users/models'

export const orderSchema = z.object({
	id: z.number(),
	createdBy: z.union([z.string(), z.null(), userSchema]).optional(),
	guestInfo: z
		.object({
			name: z.string(),
			email: z.string().email(),
			phone: z.string(),
		})
		.optional(),
	status: z.enum(['pending', 'progress', 'ready', 'completed', 'cancelled']),
	paymentMethod: z.enum(['inStore', 'card', 'b2b', 'other']),
	paymentStatus: z.enum(['pending', 'progress', 'completed', 'cancelled']),
	_isPaid: z.boolean(),
	products: z
		.array(
			z.object({
				product: z.union([z.number(), productSchema]),
				quantity: z.number(),
				id: z.string().nullable().optional(),
			}),
		)
		.nullable()
		.optional(),
	subtotal: z.number().nullable().optional(),
	discount: z.number().nullable().optional(),
	totalPrice: z.number(),
	pickupStore: z.union([z.number(), z.null(), storeSchema]).optional(),
	pickupDate: z.string().nullable().optional(),
	notes: z.string().nullable().optional(),
	updatedAt: z.string(),
	createdAt: z.string(),
})