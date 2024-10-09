import {TRPCReactProvider} from '~/trpc/react'
import {api} from '~/trpc/server'
import {Toaster} from '../ui/components/sonner'
import SheetsProvider from './sheets-provider'

export const Providers = ({children}: {children: React.ReactNode}) => {
	void api.users.getUser.prefetch()

	return (
		<TRPCReactProvider>
			<SheetsProvider />
			<Toaster position='top-center' />
			{children}
		</TRPCReactProvider>
	)
}
