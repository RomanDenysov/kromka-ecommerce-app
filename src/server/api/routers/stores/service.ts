import 'server-only'

import {COLLECTION_SLUG} from '~/server/payload/config'
import {getPayload} from '~/server/payload/utils/get-payload'
import {InActionsError, PayloadNotConfiguredError} from '~/shared/lib/errors'
import type {PublicStore} from './validators'

export async function fetchStores(): Promise<PublicStore[]> {
	try {
		const payload = await getPayload()
		if (!payload) throw new PayloadNotConfiguredError()

		const {docs: stores} = await payload.find({
			collection: COLLECTION_SLUG.STORES,
			limit: 100,
			depth: 2,
		})

		const sanitizedStores = stores.map(
			({id, createdAt, updatedAt, isActive, ...rest}) => rest,
		)

		return sanitizedStores
	} catch (error) {
		console.error('[STORE ACTIONS]: Failed to get stores', error)
		throw new InActionsError('STORE', 'Failed to get stores (getStores)')
	}
}

export async function setStore(storeId: number): Promise<{success: boolean}> {
	try {
		const payload = await getPayload()
		if (!payload) throw new PayloadNotConfiguredError()

		await payload.update({
			collection: COLLECTION_SLUG.USERS,
			id: storeId,
			data: {
				preferences: {
					preferedStore: storeId,
				},
			},
		})

		return {success: true}
	} catch (error) {
		console.error('[STORE ACTIONS]: Failed to set store', error)
		return {success: false}
	}
}