import QueryProvider from './query-provider'
import SheetsProvider from './sheets-provider'

export const RootProvider = ({children}: {children: React.ReactNode}) => {
	return (
		<QueryProvider>
			<SheetsProvider />
			{children}
		</QueryProvider>
	)
}
