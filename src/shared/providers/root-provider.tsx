
import {TRPCReactProvider} from '~/trpc/react'
import SheetsProvider from './sheets-provider'

export const RootProvider = ({children}: {children: React.ReactNode}) => {
	return (
		<TRPCReactProvider>
			<SheetsProvider />
			{children}
		</TRPCReactProvider>
	)
}
