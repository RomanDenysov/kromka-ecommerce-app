import React from 'react'
import ProductsReel from '~/features/products-reel/ui/products-reel'

export default function ProductsPage() {
	return (
		<section>
			<React.Suspense>
				<ProductsReel
					// title='Všetky produkty'
					query={{sort: 'asc', limit: 40}}
					className='py-0'
				/>
			</React.Suspense>
		</section>
	)
}
