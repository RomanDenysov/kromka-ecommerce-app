import React from 'react'
import ProductFilters from '~/features/product-filters/ui/product-filters'
import StoreSelector from '~/features/store-selector/ui/store-selector'
import Container from '~/shared/ui/components/container'
import {Heading} from '~/shared/ui/components/heading'

const MemoizedProductFilters = React.memo(ProductFilters)
const MemoizedStoreSelector = React.memo(StoreSelector)

export default function ProductsTemplate({
	children,
}: {children: React.ReactNode}) {
	return (
		<React.Fragment>
			<Container>
				<section className='py-5'>
					<div className='flex flex-col items-start justify-between gap-y-4 sm:flex-row'>
						<Heading title='Vitajte v našom obchode!' />
						<MemoizedStoreSelector />
					</div>
				</section>
			</Container>
			<MemoizedProductFilters />
			{children}
		</React.Fragment>
	)
}
