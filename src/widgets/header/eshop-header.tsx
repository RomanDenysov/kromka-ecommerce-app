import Link from 'next/link'
import React from 'react'
import CartButton from '~/features/cart-sheet/ui/cart-button'
import ProductFilters from '~/features/product-filters/ui/product-filters'
import StoreSelector from '~/features/store-selector/ui/store-selector'
import Container from '~/shared/ui/components/container'
import {Heading} from '~/shared/ui/components/heading'
import {Icons} from '~/shared/ui/icons'
import {Navbar} from './navbar'
import UserButton from './user-button'

const MemoizedProductFilters = React.memo(ProductFilters)
const MemoizedStoreSelector = React.memo(StoreSelector)

export default function EshopHeader() {
	return (
		<header className='sticky inset-x-0 top-0 z-50 bg-background'>
			<Container className='h-fit space-y-5 border-border border-b md:space-y-5'>
				<div className='flex h-16 items-center justify-between'>
					<div className='flex flex-1 items-center justify-start'>
						<React.Suspense fallback={null}>
							<Navbar />
						</React.Suspense>
					</div>

					<Link href='/' className='flex items-center justify-center'>
						<Icons.kromka className='h-5 w-auto fill-accent-foreground md:h-7' />
					</Link>

					<div className='flex flex-1 items-center justify-end gap-x-1 md:gap-x-2'>
						<span className='h-4 w-[2px] bg-border md:h-6' />
						<UserButton />
						<span className='h-4 w-[2px] bg-border md:h-6' />
						<CartButton />
					</div>
				</div>
				<section className='relative space-y-5'>
					<div className='flex flex-col items-start justify-between gap-y-4 sm:flex-row'>
						<Heading title='Vitajte v našom obchode!' />
						<MemoizedStoreSelector />
					</div>
					<div className='sticky inset-x-0 top-16 '>
						<MemoizedProductFilters />
					</div>
				</section>
			</Container>
		</header>
	)
}
