'use client'
import {useQuery} from '@tanstack/react-query'
import React from 'react'
import {getCachedStores} from '~/entities/store/actions'
import {useStoresState} from './use-stores-state'

export default function useStoreQuery() {
	const stores = useStoresState((state) => state.stores)
	const setStores = useStoresState((state) => state.setStores)

	console.log(
		'🚀 ~ file: use-stores-query.ts:10 ~ useStoreQuery ~ stores:',
		stores,
	)

	const query = useQuery({
		queryKey: ['stores'],
		queryFn: async () => await getCachedStores(),
		enabled: !stores.length,
	})

	console.log(
		'🚀 ~ file: use-stores-query.ts:26 ~ React.useEffect ~ query.data:',
		query.data,
	)
	React.useEffect(() => {
		if (query.data && query.isSuccess) {
			setStores(query.data)
		}
	}, [query.isSuccess, query.data, setStores])

	return {
		...query,
		isLoading: query.isLoading || !stores,
		user: query.data || stores,
	}
}
