import {redirect} from 'next/navigation'
import {auth} from '~/shared/lib/auth'

export default async function AuthLayout({
	children,
}: {children: React.ReactNode}) {
	const session = await auth()
	const user = session?.user
	if (user) redirect('/')

	return (
		<main className='relative grid w-screen place-items-center'>
			{children}
		</main>
	)
}
