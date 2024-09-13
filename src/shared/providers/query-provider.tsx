'use client'

import {QueryClient, QueryClientProvider, isServer} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import React from 'react'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
		},
	})
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
	if (isServer) {
		return makeQueryClient()
	}
	if (!browserQueryClient) browserQueryClient = makeQueryClient()
	return browserQueryClient
}

type Props = {
	children: React.ReactNode
}

export default function QueryProvider({children}: Props) {
	const queryClientRef = React.useRef<QueryClient>(null)
	if (!queryClientRef.current) {
		queryClientRef.current = getQueryClient()
	}

	return (
		<QueryClientProvider client={queryClientRef.current}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
