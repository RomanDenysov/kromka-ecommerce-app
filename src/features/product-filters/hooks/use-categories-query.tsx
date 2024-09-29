'use client'

import {useQuery} from '@tanstack/react-query'
import {getCategories} from '~/entities/category/actions'

export const useCategoriesQuery = () => {
	const query = useQuery({
		queryKey: ['categories'],
		queryFn: async () => await getCategories(),
	})

	return query
}
