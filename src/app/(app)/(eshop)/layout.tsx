import React from 'react'
import {Footer} from '~/widgets/footer'
import EshopHeader from '~/widgets/header/eshop-header'

export default function EshopLayout({
	children,
}: Readonly<{children: React.ReactNode}>) {
	return (
		<React.Fragment>
			<EshopHeader />
			<main className='relative mx-auto min-h-screen'>{children}</main>
			<Footer />
		</React.Fragment>
	)
}
