export default async function AuthLayout({
	children,
}: {children: React.ReactNode}) {
	// const session = await auth()
	// const user = session?.user
	// if (user) redirect('/')

	return <main className='relative size-full '>{children}</main>
}
