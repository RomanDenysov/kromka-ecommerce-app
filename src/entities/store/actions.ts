'use server'

import {cache} from 'react'
import {COLLECTION_SLUG} from '~/payload/config'
import type {Store} from '~/payload/payload-types'
import {getPayload} from '~/payload/utils/get-payload'
import {InActionsError, PayloadNotConfiguredError} from '~/shared/lib/errors'

export async function getStores(): Promise<Store[]> {
	try {
		const payload = await getPayload()
		if (!payload) throw new PayloadNotConfiguredError()

		const {docs: stores} = await payload.find({
			collection: COLLECTION_SLUG.STORES,
			limit: 100,
			depth: 2,
		})

		console.log('🚀 ~ file: actions.ts:19 ~ getStores ~ stores:', stores)

		return stores
	} catch (error) {
		console.error('[STORE ACTIONS]: Failed to get stores', error)
		throw new InActionsError('STORE', 'Failed to get stores (getStores)')
	}
}

export const getCachedStores = cache(getStores)

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