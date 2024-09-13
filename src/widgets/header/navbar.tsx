'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {cn} from '~/shared/lib/utils'
import {buttonVariants} from '~/shared/ui/components/button'

const NAV_LINKS = [
	{href: '/products', label: 'Nakupovat'},
	{href: '/blog', label: 'Blog'},
	{href: '/b2b', label: 'B2B'},
]

const Navbar = () => {
	const pathname = usePathname()

	const isHome = pathname === '/'

	if (isHome) return null

	const isActive = (href: string) => pathname.includes(href)

	return (
		<div className='inline-flex items-center justify-between gap-x-2'>
			{NAV_LINKS.map((link) => (
				<Link
					key={link.href}
					className={cn(
						buttonVariants({variant: 'link'}),
						'px-2 text-primary',
						isActive(link.href) && 'text-accent-foreground underline',
					)}
					aria-current={isActive(link.href) ? 'page' : undefined}
					href={link.href}>
					{link.label}
				</Link>
			))}
		</div>
	)
}

export default Navbar
