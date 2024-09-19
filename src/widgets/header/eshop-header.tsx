'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react'
import CartButton from '~/features/cart-sheet/ui/cart-button'
import ProductFilters from '~/features/product-filters/ui/product-filters'
import StoreSelector from '~/features/store-selector/ui/store-selector'
import Container from '~/shared/ui/components/container'
import {Heading} from '~/shared/ui/components/heading'
import {Icons} from '~/shared/ui/icons'
import Navbar from './navbar'
import UserButton from './user-button'

const MemoizedProductFilters = React.memo(ProductFilters)
const MemoizedStoreSelector = React.memo(StoreSelector)

const NAV_LINKS = [
	{href: '/', label: 'Domov'},
	{href: '/products', label: 'Nakupovat'},
	{href: '/blog', label: 'Blog'},
	{href: '/b2b', label: 'B2B'},
]

export default function EshopHeader() {
	const pathname = usePathname()

	const isHome = pathname === '/'

	const isActive = (href: string) => {
		if (href === '/') return false
		return pathname.startsWith(href)
	}
	return (
		<header className='sticky inset-x-0 top-0 z-50 bg-background'>
			<Container className='h-fit space-y-10 border-border border-b pt-2'>
				<div className='flex items-center justify-between'>
					{isHome ? null : <Navbar links={NAV_LINKS} isActive={isActive} />}

					<Link href='/' className='flex flex-1 items-center justify-center'>
						<Icons.kromka className='h-6 w-auto fill-accent-foreground' />
					</Link>

					<div className='flex flex-1 items-center justify-end gap-x-2'>
						<span className='h-6 w-[2px] bg-border' />
						<UserButton />
						<span className='h-6 w-[2px] bg-border' />
						<CartButton />
					</div>
				</div>
				<section className='space-y-5'>
					<div className='flex flex-col items-start justify-between sm:flex-row'>
						<Heading title='Vitajte v našom obchode!' />
						<MemoizedStoreSelector />
					</div>
					<div>
						<MemoizedProductFilters />
					</div>
				</section>
			</Container>
		</header>
	)
}
