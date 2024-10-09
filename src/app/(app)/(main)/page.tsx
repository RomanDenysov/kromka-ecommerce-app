import AboutCard from '~/features/about/ui/about-card'
import HeroGrid from '~/features/hero-grid/ui/hero-grid'
import ProductsReel from '~/features/products-reel/ui/products-reel'
import Container from '~/shared/ui/components/container'
import {HydrateClient, api} from '~/trpc/server'

export default async function HomePage() {
	const queries = {
		query1: {
			limit: 8,
			sort: 'asc',
		},
		query2: {
			limit: 8,
			sort: 'asc',
		},
	}

	await Promise.all([
		api.products.getInfiniteProducts.prefetchInfinite({
			limit: queries.query1.limit,
			query: queries.query1,
		}),
		api.products.getInfiniteProducts.prefetchInfinite({
			limit: queries.query2.limit,
			query: queries.query2,
		}),
	])

	return (
		<HydrateClient>
			<Container className='grid space-y-10 pt-5 pb-20 sm:pt-10 md:space-y-20'>
				<HeroGrid />
				<ProductsReel
					className='py-0'
					title='Naše produkty'
					href='/products#category=nase-pecivo'
					limit={8}
					query={queries.query1}
				/>
				<ProductsReel
					className='py-0'
					title='Naše pecivo'
					href='/products#category=nase-pecivo'
					limit={8}
					query={queries.query2}
				/>
				<AboutCard />
			</Container>
		</HydrateClient>
	)
}
