import {z} from 'zod'

export const categorySchema = z.object({
	name: z.string(),
	slug: z.string().nullable().optional(),
})

export const categoriesSchema = z.array(categorySchema)

export type PublicCategory = z.infer<typeof categorySchema>
