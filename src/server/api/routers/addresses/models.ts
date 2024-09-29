import {z} from 'zod'

export const addressSchema = z.object({
	id: z.number(),
	street: z.string(),
	street2: z.string().nullable().optional(),
	city: z.string(),
	zip: z.string(),
	country: z.string(),
	googleMapsUrl: z.string().nullable().optional(),
})
