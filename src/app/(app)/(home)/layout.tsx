import React from 'react'
import {Header} from '~/widgets/header'

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<React.Fragment>
			<Header />
			<main className='mx-auto min-h-screen'>{children}</main>
		</React.Fragment>
	)
}
