import {z} from 'zod'
import {addressSchema} from '../addresses/models'

export const storeSchema = z.object({
	name: z.string(),
	openHours: z
		.object({
			mondayFriday: z.string().nullable().optional(),
			saturday: z.string().nullable().optional(),
			sunday: z.string().nullable().optional(),
		})
		.optional(),
	phone: z.string(),
	email: z.string().email().nullable().optional(),
	address: z.union([z.number(), addressSchema]),
	slug: z.string().nullable().optional(),
})

export const storesSchema = z.array(storeSchema)

export type PublicStore = z.infer<typeof storeSchema>

export const storeIdValidator = z.number().min(1)

export type StoreId = z.infer<typeof storeIdValidator>
