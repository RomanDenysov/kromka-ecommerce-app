import HeroGrid from '~/features/hero-grid/ui/hero-grid'
import ProductsReel from '~/features/products-reel/ui/products-reel'
import {auth} from '~/shared/lib/auth'
import Container from '~/shared/ui/components/container'

export default async function HomePage() {
	const session = await auth()
	const user = session?.user

	return (
		<Container className='grid space-y-10 py-10'>
			<section>
				<HeroGrid />
			</section>
			<section>
				<ProductsReel
					className='py-0'
					title='Naše produkty'
					href='/products#category=nase-pecivo'
					query={{
						limit: 10,
						sort: 'asc',
					}}
				/>
			</section>
		</Container>
	)
}
