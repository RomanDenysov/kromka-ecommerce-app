import Link from 'next/link'
import React from 'react'
import CartButton from '~/features/cart-sheet/ui/cart-button'
import Container from '~/shared/ui/components/container'
import {Icons} from '~/shared/ui/icons'
import {Navbar} from './navbar'
import UserButton from './user-button'

export default function Header() {
	return (
		<header className='sticky inset-x-0 top-0 z-50 bg-background'>
			<Container className='flex h-16 items-center justify-between border-border border-b'>
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
			</Container>
		</header>
	)
}
