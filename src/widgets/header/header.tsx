import Link from 'next/link'
import CartButton from '~/features/cart-sheet/ui/cart-button'
import {auth} from '~/shared/lib/auth'
import Container from '~/shared/ui/components/container'
import {Icons} from '~/shared/ui/icons'
import Navbar from './navbar'
import UserButton from './user-button'

export default async function Header() {
	const session = await auth()
	const user = session?.user

	return (
		<header className='sticky inset-x-0 top-0 z-50 bg-background'>
			<Container className='flex h-16 items-center justify-between border-border border-b'>
				<Link href='/'>
					h-16 borderb
					<Icons.logo className='size-10 fill-accent-foreground' />
				</Link>

				<div>
					<Navbar />
				</div>

				<div className='flex items-center gap-x-2'>
					<span className='h-8 w-[2px] bg-border' />
					<UserButton />
					<span className='h-8 w-[2px] bg-border' />
					<CartButton />
				</div>
			</Container>
		</header>
	)
}
