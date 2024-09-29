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
import {useUser} from '~/features/user/hooks/use-user'
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

export const BUTTON_OPTIONS = [
	{
		label: 'Profile',
		href: '/account',
		icon: UserIcon,
	},
	{
		label: 'Settings',
		href: '/account/settings',
		icon: SettingsIcon,
	},
	{
		label: 'Support',
		href: '/account/support',
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

const UserButton = () => {
	// const {data: user, isLoading} = useUserQuery()
	// TODO: check if user is admin

	const user = useUser((state) => state.user)
	const isLoading = false

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild disabled={isLoading}>
				{user ? (
					<Button
						disabled={isLoading}
						variant={'ghost'}
						size={'icon'}
						className='relative grid size-9 select-none place-items-center rounded-full focus:outline-none focus:ring-0 focus-visible:ring-0'>
						<Avatar className='size-9'>
							<AvatarImage src={user.image || undefined} />
							<AvatarFallback>
								{getNameInitials(user.name ? user.name : '') ?? '?'}
							</AvatarFallback>
						</Avatar>
					</Button>
				) : (
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
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuGroup className='space-y-1'>
					{BUTTON_OPTIONS.map((option) => (
						<DropdownMenuItem key={option.label} asChild>
							<Link href={option.href}>
								<option.icon size={20} className='mr-2' />
								<span>{option.label}</span>
							</Link>
						</DropdownMenuItem>
					))}
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<Link href={ADMIN_BTN.href}>
							<ADMIN_BTN.icon size={20} className='mr-2' />
							<span>{ADMIN_BTN.label}</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem asChild>
						<Link href={LOGOUT_BTN.href}>
							<LOGOUT_BTN.icon size={20} className='mr-2' />
							<span>{LOGOUT_BTN.label}</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserButton
