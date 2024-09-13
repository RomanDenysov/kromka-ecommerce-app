'use server'

import {cache} from 'react'
import {COLLECTION_SLUG} from '~/payload/config'
import {getPayload} from '~/payload/utils/get-payload'
import {AVAILABLE_PRODUCTS} from '~/shared/config/constants'
import {InActionsError, PayloadError} from '~/shared/lib/errors'
import {
	type InfiniteProductsQueryInput,
	type ProductSlug,
	infiniteQueryValidator,
	productSlugValidator,
} from './models'

export async function getInfiniteProducts(params: InfiniteProductsQueryInput) {
	try {
		const validationResult = infiniteQueryValidator.safeParse(params)
		if (!validationResult.success) {
			throw new InActionsError('PRODUCT', 'Invalid query params (infinite)')
		}
		const {query, cursor, excludeProductId} = validationResult.data

		const {sort, limit, ...queryOpts} = query

		const page = cursor || 1

		const payload = await getPayload()
		if (!payload) throw new PayloadError('Payload not configured (infinite)')

		const parsedQueryOpts: Record<string, {equals: string}> = {}

		for (const [key, value] of Object.entries(queryOpts)) {
			if (typeof value === 'string') {
				parsedQueryOpts[key] = {
					equals: value,
				}
			} else if (typeof value === 'number') {
				parsedQueryOpts[key] = {
					equals: String(value),
				}
			}
		}

		// TODO: Add support for multiple filters
		// const parsedQuery = Object.keys(parsedQueryOpts).length > 0 ? { AND: parsedQueryOpts } : {}

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const conditions: Record<string, any> = {
			status: {
				in: AVAILABLE_PRODUCTS,
			},
			...parsedQueryOpts,
		}

		if (excludeProductId) {
			conditions.id = {
				not_equals: excludeProductId,
			}
		}
		const {
			docs: items,
			hasNextPage,
			nextPage,
		} = await payload.find({
			collection: COLLECTION_SLUG.PRODUCTS,
			where: conditions,
			sort,
			limit,
			page,
			depth: 2,
		})

		return {
			items,
			nextPage: hasNextPage ? nextPage : null,
		}
	} catch (error) {
		console.error('[PRODUCT ACTIONS]: Failed to get products (infinite)', error)
		throw new InActionsError('PRODUCT', 'Failed to get products (infinite)')
	}
}

export async function getProduct(slug: ProductSlug) {
	try {
		const validationResult = productSlugValidator.safeParse(slug)
		if (!validationResult.success) {
			throw new InActionsError('PRODUCT', 'Invalid slug (getProduct)')
		}
		const productSlug = validationResult.data

		const payload = await getPayload()
		if (!payload) throw new PayloadError('Payload not configured (getProduct)')

		const result = await payload.find({
			collection: COLLECTION_SLUG.PRODUCTS,
			where: {
				slug: {
					equals: productSlug,
				},
			},
			limit: 1,
			depth: 3,
		})

		if (result.docs.length === 0) {
			throw new InActionsError('PRODUCT', 'Product not found (getProduct)')
		}
		const product = result.docs[0]

		return product
	} catch (error) {
		console.error(
			'[PRODUCT ACTIONS]: Failed to get product (getProduct)',
			error,
		)
		throw new InActionsError('PRODUCT', 'Failed to get product (getProduct)')
	}
}

export const getCachedProduct = cache(
	async (slug: ProductSlug) => await getProduct(slug),
)
