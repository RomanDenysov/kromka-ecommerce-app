'use server'

import {COLLECTION_SLUG} from '~/payload/config'
import {getPayload} from '~/payload/utils/get-payload'
import {PayloadNotConfiguredError} from '~/shared/lib/errors'

export async function getCategories() {
	try {
		const payload = await getPayload()
		if (!payload) throw new PayloadNotConfiguredError()

		const {docs: categories} = await payload.find({
			collection: COLLECTION_SLUG.CATEGORIES,
			limit: 20,
			depth: 2,
			sort: 'asc',
		})

		// Используем Promise.all для асинхронной фильтрации
		const categoriesWithProducts = await Promise.all(
			categories.map(async (category) => {
				const {totalDocs: productCount} = await payload.count({
					collection: COLLECTION_SLUG.PRODUCTS,
					where: {
						category: {
							equals: category.id,
						},
					},
				})
				return productCount > 0 ? category : null
			}),
		)

		// Фильтруем категории, у которых есть продукты
		return categoriesWithProducts.filter((category) => category !== null)
	} catch (error) {
		console.error('Error fetching categories:', error)
		return []
	}
}