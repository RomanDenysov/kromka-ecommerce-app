import {z} from 'zod'

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
