import Container from '~/shared/ui/components/container'

export default function ProductsTemplate({
	children,
}: {children: React.ReactNode}) {
	return <Container className='space-y-10'>{children}</Container>
}
