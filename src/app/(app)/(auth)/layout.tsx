export default function AuthLayout({children}: {children: React.ReactNode}) {
	return (
		<main className='relative grid w-screen place-items-center'>
			{children}
		</main>
	)
}
