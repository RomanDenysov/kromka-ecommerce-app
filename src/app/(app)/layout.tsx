import {GeistMono} from 'geist/font/mono'
import {GeistSans} from 'geist/font/sans'
import type {Metadata, Viewport} from 'next'
import {cn} from '~/shared/lib/utils'
import {RootProvider} from '~/shared/providers/root-provider'
import '~/shared/styles/globals.css'

export const viewport: Viewport = {
	themeColor: [
		{media: '(prefers-color-scheme: light)', color: 'white'},
		{media: '(prefers-color-scheme: dark)', color: 'black'},
	],
}

// TODO: Add your own metadata
export const metadata: Metadata = {
	title: '',
	description: '',
}

export default function RootLayout({
	children,
}: Readonly<{children: React.ReactNode}>) {
	return (
		<html lang='sk'>
			<body
				className={cn(
					'relative min-h-screen bg-backgorund font-sans text-foreground antialiased',
					GeistSans.variable,
					GeistMono.variable,
				)}>
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	)
}
