import type {CollectionBeforeOperationHook, PayloadRequest} from 'payload'
import {COLLECTION_SLUG} from '~/payload/config'
import type {Product, Store} from '~/payload/payload-types'

let storeCache: Store[] | null = null

/**
 * Retrieves a list of active stores from the PayloadCMS.
 * If the stores are already cached, returns the cached version.
 * Otherwise, fetches the stores from the database and caches the result.
 *
 * @param {PayloadRequest} req - The request object provided by PayloadCMS.
 * @returns {Promise<Store[]>} - A promise that resolves to an array of active stores.
 */
const getStores = async (req: PayloadRequest): Promise<Store[]> => {
	if (!storeCache) {
		const stores = await req.payload.find({
			collection: COLLECTION_SLUG.STORES,
			where: {
				isActive: {equals: true},
			},
		})
		storeCache = stores.docs as Store[]
	}
	return storeCache
}

/**
 * Clears the cached list of stores whenever a store is created, updated, or deleted.
 *
 * This hook is intended to be used with PayloadCMS operations to ensure that the
 * cache remains consistent with the database.
 *
 * @param {Object} args - The arguments passed to the hook.
 * @param {string} args.operation - The type of operation being performed (create, update, delete).
 */

export const clearStoreCacheOnUpdate: CollectionBeforeOperationHook = ({
	operation,
}) => {
	if (
		operation === 'create' ||
		operation === 'update' ||
		operation === 'delete'
	) {
		storeCache = null
	}
}

/**
 * Manages the inventory for products that have limited availability.
 *
 * This hook checks the availability of a product, and if it is limited,
 * it ensures that the store-specific inventory is properly initialized
 * and updated for the current date.
 *
 * @param {Object} args - The arguments passed to the hook.
 * @param {PayloadRequest} args.req - The request object provided by PayloadCMS.
 * @param {Object} args.data - The data being processed by the hook.
 * @returns {Promise<Partial<Product>>} - The modified data for the product.
 */
export const manageInventory: CollectionBeforeOperationHook = async ({
	args,
	req,
}) => {
	if (!args || !args.data) {
		console.error('args или args.data не определены')
		return
	}

	const data = (await args.data) as Partial<Product>
	if (data.availabilityType === 'limited') {
		const today = new Date().toISOString().split('T')[0] || ''

		if (!data.storeInventory) {
			data.storeInventory = []
		}

		const stores = await getStores(req)

		for (const store of stores) {
			let storeInventory = data.storeInventory?.find(
				(inv) => inv.storeId === store.id,
			)

			if (!storeInventory) {
				storeInventory = {
					storeId: store.id,
					dailyInventory: [],
				}
				data.storeInventory.push(storeInventory)
			}

			const todayInventory = storeInventory?.dailyInventory?.find(
				(inv) => inv.date === today,
			)

			if (!todayInventory) {
				const defaultQuantity =
					data.availability?.find(
						(av) =>
							av.day.toLowerCase() ===
							new Date()
								.toLocaleString('en-us', {weekday: 'long'})
								.toLowerCase(),
					)?.quantity || 0

				storeInventory?.dailyInventory?.push({
					date: today,
					quantity: defaultQuantity,
				})
			}
		}
	}
	return data
}
