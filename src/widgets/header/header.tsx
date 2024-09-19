'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import CartButton from '~/features/cart-sheet/ui/cart-button'
import {cn} from '~/shared/lib/utils'
import Container from '~/shared/ui/components/container'
import {Icons} from '~/shared/ui/icons'
import Navbar from './navbar'
import UserButton from './user-button'

export const NAV_LINKS = [
	{href: '/', label: 'Domov'},
	{href: '/products', label: 'Nakupovat'},
	{href: '/blog', label: 'Blog'},
	{href: '/b2b', label: 'B2B'},
]

export default function Header() {
	const pathname = usePathname()

	const isHome = pathname === '/'

	const isActive = (href: string) => {
		if (href === '/') return false
		return pathname.startsWith(href)
	}
	return (
		<header className='sticky inset-x-0 top-0 z-50 bg-background'>
			<Container className='flex h-16 items-center justify-between border-border border-b'>
				{isHome ? null : <Navbar links={NAV_LINKS} isActive={isActive} />}

				<Link
					href='/'
					className={cn(
						'flex flex-1 items-center justify-center',
						isHome && 'justify-start',
					)}>
					<Icons.kromka className='h-6 w-auto fill-accent-foreground md:h-8' />
				</Link>

				<div className='flex flex-1 items-center justify-end gap-x-2'>
					<span className='h-6 w-[2px] bg-border' />
					<UserButton />
					<span className='h-6 w-[2px] bg-border' />
					<CartButton />
				</div>
			</Container>
		</header>
	)
}
