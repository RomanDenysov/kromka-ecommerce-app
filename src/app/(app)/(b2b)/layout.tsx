import React from 'react'

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<React.Fragment>
			<main className='relative mx-auto min-h-screen'>{children}</main>
		</React.Fragment>
	)
}
