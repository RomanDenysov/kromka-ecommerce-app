import AboutCard from '~/features/about/ui/about-card'
import HeroGrid from '~/features/hero-grid/ui/hero-grid'
import ProductsReel from '~/features/products-reel/ui/products-reel'
import Container from '~/shared/ui/components/container'

export default function HomePage() {
	return (
		<Container className='grid space-y-10 py-10 md:space-y-20'>
			<HeroGrid />
			<ProductsReel
				className='py-0'
				title='Naše produkty'
				href='/products#category=nase-pecivo'
				limit={8}
				query={{
					limit: 8,
					sort: 'asc',
				}}
			/>
			<ProductsReel
				className='py-0'
				title='Naše pecivo'
				href='/products#category=nase-pecivo'
				limit={8}
				query={{
					limit: 8,
					sort: 'asc',
				}}
			/>
			<AboutCard />
		</Container>
	)
}
