'use client'

import Link from 'next/link'
import {cn} from '~/shared/lib/utils'
import {buttonVariants} from '~/shared/ui/components/button'

type Props = {
	links: Array<{href: string; label: string}>
	isActive: (href: string) => boolean
}

const Navbar = ({links, isActive}: Props) => {
	return (
		<div className='inline-flex flex-1 items-center justify-start gap-x-1 lg:gap-x-2'>
			{links.map((link) => (
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
