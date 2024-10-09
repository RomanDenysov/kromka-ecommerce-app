import React from 'react'
import ProductsReel from '~/features/products-reel/ui/products-reel'
import Container from '~/shared/ui/components/container'
import {HydrateClient, api} from '~/trpc/server'

type Param = string | string[] | undefined

type Props = {
	params: {
		productSlug: string
	}
	searchParams?: {
		[key: string]: Param
	}
}

const ARGS = {limit: 100, sort: 'asc'}

export default function ProductsPage({params, searchParams}: Props) {
	const categorySlug = Array.isArray(searchParams?.c)
		? searchParams.c[0]
		: searchParams?.c || ''

	void api.products.getInfiniteProducts.prefetchInfinite({query: ARGS})

	return (
		<Container className='pt-5 pb-20'>
			<React.Suspense>
				<HydrateClient>
					<ProductsReel
						// title='Všetky produkty']
						filteredOptions={categorySlug}
						query={ARGS}
						className='py-0'
					/>
				</HydrateClient>
			</React.Suspense>
		</Container>
	)
}
