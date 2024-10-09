'use client'

import {
	BookLockIcon,
	HelpCircleIcon,
	LogInIcon,
	LogOutIcon,
	SettingsIcon,
	UserIcon,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {cn, getNameInitials} from '~/shared/lib/utils'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '~/shared/ui/components/avatar'
import {Button, buttonVariants} from '~/shared/ui/components/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '~/shared/ui/components/dropdown-menu'
import {Skeleton} from '~/shared/ui/components/skeleton'
import {api} from '~/trpc/react'

export const BUTTON_OPTIONS = [
	{
		label: 'Profile',
		href: '',
		icon: UserIcon,
	},
	{
		label: 'Settings',
		href: '/profile/settings',
		icon: SettingsIcon,
	},
	{
		label: 'Support',
		href: '/profile/support',
		icon: HelpCircleIcon,
	},
]

const ADMIN_BTN = {
	label: 'Admin Panel',
	href: '/admin',
	icon: BookLockIcon,
}

const LOGOUT_BTN = {
	label: 'Logout',
	href: '/sign-out',
	icon: LogOutIcon,
}

export const UserButton = React.memo(() => {
	const {data: user, isLoading} = api.users.getUser.useQuery()
	if (isLoading) return <Skeleton className='size-9 rounded-full' />
	if (!user)
		return (
			<Link
				href={
					isLoading
						? '/'
						: {
								pathname: '/auth',
								query: {
									authState: 'signIn',
								},
							}
				}
				className={cn(
					buttonVariants({variant: 'ghost', size: 'icon'}),
					'relative grid size-9 place-items-center rounded-full',
				)}>
				<LogInIcon size={24} />
			</Link>
		)

	const isAdmin = user?.role === 'admin'

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild disabled={isLoading}>
				<Button
					disabled={isLoading}
					variant={'ghost'}
					size={'icon'}
					className='relative grid size-9 select-none place-items-center rounded-full focus:outline-none focus:ring-0 focus-visible:ring-0'>
					<Avatar className='size-9'>
						<AvatarImage src={user.image || undefined} alt={user.name || ''} />
						<AvatarFallback delayMs={600}>
							{user.name ? getNameInitials(user.name) : <UserIcon size={24} />}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuGroup className='space-y-1'>
					{BUTTON_OPTIONS.map((option) => (
						<DropdownMenuItem key={option.label} asChild>
							<Link href={{pathname: `/profile/${user.id}${option.href}`}}>
								<option.icon size={20} className='mr-2' />
								<span>{option.label}</span>
							</Link>
						</DropdownMenuItem>
					))}
					{isAdmin && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={ADMIN_BTN.href}>
									<ADMIN_BTN.icon size={20} className='mr-2' />
									<span>{ADMIN_BTN.label}</span>
								</Link>
							</DropdownMenuItem>
						</>
					)}

					<DropdownMenuSeparator />

					<DropdownMenuItem asChild>
						<Link href={LOGOUT_BTN.href} replace>
							<LOGOUT_BTN.icon size={20} className='mr-2' />
							<span>{LOGOUT_BTN.label}</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
})


