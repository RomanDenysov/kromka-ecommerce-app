'use client'

import {ChevronRightIcon} from 'lucide-react'
import Link from 'next/link'
import {NAV_LINKS} from '~/shared/config/navigation'
import {cn} from '~/shared/lib/utils'
import {buttonVariants} from '~/shared/ui/components/button'

export const FooterNav = () => {
	return (
		<div className='flex flex-col items-start justify-start space-y-1'>
			{NAV_LINKS.map((link) => (
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
