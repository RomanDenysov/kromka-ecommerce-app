'use client'

import {useQuery} from '@tanstack/react-query'
import React from 'react'
import {useUser} from '~/features/user/hooks/use-user'
import {getUser} from '../actions'

export const useUserQuery = () => {
	const setUser = useUser((state) => state.setUser)
	const user = useUser((state) => state.user)

	console.log('🚀 ~ file: use-user-query.ts:12 ~ useUserQuery ~ user:', user)


	const query = useQuery({
		queryKey: ['user'],
		queryFn: async () => await getUser(),
		enabled: !user,
	})

	console.log(
		'🚀 ~ file: use-user-query.ts:23 ~ useUserQuery ~ query:',
		query.data,
	)
	React.useEffect(() => {


		if (query.data && query.isSuccess) {
			setUser(query.data)
		}
	}, [query.isSuccess, query.data, setUser])

	return {
		...query,
		isLoading: query.isLoading || !user,
		user: query.data || user,
	}
}
