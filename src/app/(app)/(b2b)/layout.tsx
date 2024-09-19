import React from 'react'
import {Footer} from '~/widgets/footer'
import {Header} from '~/widgets/header'

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<React.Fragment>
			<Header />
			<main className='relative mx-auto min-h-screen'>{children}</main>
			<Footer />
		</React.Fragment>
	)
}
