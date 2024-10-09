
import {LogOutIcon} from 'lucide-react'
import Link from 'next/link'
import {redirect} from 'next/navigation'
import type React from 'react'
import {cn} from '~/shared/lib/utils'
import {buttonVariants} from '~/shared/ui/components/button'
import Container from '~/shared/ui/components/container'
import {Heading} from '~/shared/ui/components/heading'
import {api} from '~/trpc/server'
import {SidebarMenu} from './[userId]/_components/sidebar-menu'

export default async function ProfileTemplate({
	children,
}: {children: React.ReactNode}) {
	const user = await api.users.getUser()
	if (!user) redirect('/')

	const greeting =
		user.name && user.name.length > 0 ? `Vítame ${user.name}` : 'Vítame'

	return (
		<Container className='flex h-full flex-col space-y-10 py-10'>
			<div className='flex items-center justify-between'>
				<Heading title={greeting} />
				<Link
					href={'/sign-out'}
					className={cn(
						buttonVariants({variant: 'outline'}),
						'ms-auto self-end',
					)}>
					<LogOutIcon size={20} className='mr-2' />
					Odhlásiť sa
				</Link>
			</div>
			<div className='flex flex-1 flex-grow border-border border-t'>
				<SidebarMenu userId={user.id} />
				<div className='flex-1 flex-grow basis-full sm:pl-10'>{children}</div>
			</div>
		</Container>
	)
}
