'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react'
import {cn} from '~/shared/lib/utils'
import {buttonVariants} from '~/shared/ui/components/button'

export const SidebarMenu = ({userId}: {userId?: string}) => {
	const pathname = usePathname()
	const MenuItems = [
		{
			label: 'Osobne informacie',
			href: `/profile/${userId}`,
		},
		{
			label: 'Vaše nákupy',
			href: `/profile/${userId}/orders`,
		},
		{
			label: 'Nastavenia profilu',
			href: `/profile/${userId}/settings`,
		},
		{
			label: 'Poziadavky',
			href: `/profile/${userId}/support`,
		},
	]
	const [isActive, setIsActive] = React.useState<boolean>(false)

	if (!userId) return null

	return (
		<aside
			className={cn(
				'relative hidden flex-col justify-between gap-y-10 border-border border-r py-4 pr-5 sm:flex',
			)}>
			<ul className='flex-grow space-y-2'>
				{MenuItems.map((item) => (
					<li key={item.href}>
						<Link
							href={item.href}
							className={cn(
								buttonVariants({variant: 'ghost'}),
								'w-full justify-start',
								pathname === item.href && 'bg-accent text-accent-foreground',
							)}>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	)
}
