'use client'

import {ChevronRightIcon} from 'lucide-react'
import Link from 'next/link'
import {cn} from '~/shared/lib/utils'
import {buttonVariants} from '~/shared/ui/components/button'
import {NAV_LINKS} from '../header/header'

export const FooterNav = () => {
	const links = NAV_LINKS
	return (
		<div className='flex flex-col items-start justify-start space-y-1'>
			{links.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className={cn(
						buttonVariants({variant: 'ghost'}),
						'group flex items-center font-medium text-muted-foreground transition-all hover:bg-background',
					)}>
					{link.label}
					<ChevronRightIcon
						size={20}
						className='invisible ml-0.5 transition-all group-hover:visible'
					/>
				</Link>
			))}
		</div>
	)
}
