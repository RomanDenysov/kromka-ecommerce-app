import {useInfiniteQuery} from '@tanstack/react-query'
import React from 'react'
import {getInfiniteProducts} from '~/entities/product/actions'
import type {InfiniteProductsQueryInput} from '~/entities/product/models'
import type {Product} from '~/payload/payload-types'

export function useInfiniteProductQuery(params: InfiniteProductsQueryInput) {
	const {data, isLoading, hasNextPage, fetchNextPage, error, isError} =
		useInfiniteQuery({
			queryKey: ['products', params],
			queryFn: async ({pageParam = 1}) =>
				await getInfiniteProducts({...params, cursor: pageParam}),
			getNextPageParam: (lastPage) => lastPage.nextPage,
			initialPageParam: 1,
		})
		
	const products = React.useMemo((): (Product | null)[] => {
		if (isLoading) {
			return new Array(params.limit).fill(null)
		}

		if (!data) {
			return []
		}

		return data.pages.flatMap((page) =>
			page.items.map((item): Product | null => (item ? item : null)),
		)
	}, [data, isLoading, params.limit])

	return {products, isLoading, hasNextPage, fetchNextPage, error, isError}
}
