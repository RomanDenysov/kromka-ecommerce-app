import QueryProvider from "./query-provider"

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  )
}