import 'server-only'

import {fromPairs, isInteger, map} from 'lodash'
import {COLLECTION_SLUG} from '~/server/payload/config'
import type {GetPayloadType} from '~/server/payload/utils/get-payload'
import {AVAILABLE_PRODUCTS} from '~/shared/config/constants'
import {InActionsError} from '~/shared/lib/errors'
import type {InfiniteProductsQueryInput, ProductSlug} from './models'

export async function fetchInfiniteProducts(
	payload: GetPayloadType,
	params: InfiniteProductsQueryInput,
) {
	try {
		const {query, cursor, excludeProductId} = params
		const {sort, limit, categorySlug, ...queryOpts} = query

		const page = getPage(cursor)
		const conditions = buildConditions(queryOpts, excludeProductId)

		if (categorySlug) {
			const categoryId = await getCategoryId(payload, categorySlug)
			conditions.category = {
				equals: categoryId,
			}
		}

		// Запрос на получение продуктов с обновленными условиями
		const {docs: items, hasNextPage, nextPage} = await payload.find({
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

function getPage(cursor: number | undefined): number {
	return cursor && isInteger(cursor) && cursor > 0 ? cursor : 1
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type QueryOptsType = Record<string, any>
function buildConditions(queryOpts: QueryOptsType, excludeProductId?: number) {
	const parsedQueryOpts = fromPairs(
		map(queryOpts, (value, key) => [key, {equals: value}]),
	)

	const conditions: QueryOptsType = {
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

	return conditions
}
async function getCategoryId(
	payload: GetPayloadType,
	categorySlug: string,
): Promise<number | Error> {
	const categoryResult = await payload.find({
		collection: COLLECTION_SLUG.CATEGORIES,
		where: {
			slug: {
				equals: categorySlug,
			},
		},
		limit: 1,
	})

	if (categoryResult.docs[0] && categoryResult.docs.length > 0) {
		return categoryResult.docs[0].id
	}
	throw new InActionsError('CATEGORY', 'Category not found')
}

export async function fetchProduct(payload: GetPayloadType, slug: ProductSlug) {
	try {
		const result = await payload.find({
			collection: COLLECTION_SLUG.PRODUCTS,
			where: {
				slug: {
					equals: slug,
				},
			},
			limit: 1,
			depth: 2,
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
