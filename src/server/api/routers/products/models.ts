import {z} from 'zod'
import {categorySchema} from '../categories/models'

export const queryValidator = z.object({
	category: z.number().optional(),
	search: z.string().max(100).optional(),
	sort: z.enum(['asc', 'desc', 'adminSortRank']).optional(),
	limit: z.number().default(10).optional(),
})

export const infiniteQueryValidator = z.object({
	limit: z.number().min(1).max(100),
	cursor: z.number().nullish(),
	query: queryValidator,
	excludeProductId: z.number().optional(),
})

export type ProductsQueryType = z.infer<typeof queryValidator>
export type InfiniteProductsQueryInput = z.infer<typeof infiniteQueryValidator>

export const productSlugValidator = z.string().min(1)

export type ProductSlug = z.infer<typeof productSlugValidator>

export const tagSchema = z.object({
	id: z.number(),
	name: z.string(),
})

export const productSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string(),
	composition: z.string().nullable().optional(),
	price: z.number(),
	category: z.union([z.number(), categorySchema]),
	tags: z
		.array(z.union([z.number(), tagSchema]))
		.nullable()
		.optional(),
	status: z.enum(['draft', 'active', 'sold', 'coming', 'archived']),
	images: z.array(
		z.object({
			image: z.union([z.number(), z.string()]),
			id: z.string().nullable().optional(),
		}),
	),
	slug: z.string().nullable().optional(),
})