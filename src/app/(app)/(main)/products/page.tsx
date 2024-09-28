import React from 'react'
import ProductsReel from '~/features/products-reel/ui/products-reel'
import Container from '~/shared/ui/components/container'

export default function ProductsPage() {

	return (
		<Container>
			<React.Suspense>
				<ProductsReel
					// title='Všetky produkty'
					query={{sort: 'asc', limit: 40}}
					className='py-0'
				/>
			</React.Suspense>
		</Container>
	)
}
