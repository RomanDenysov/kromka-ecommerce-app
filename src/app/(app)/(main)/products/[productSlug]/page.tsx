import {notFound} from 'next/navigation'
import React from 'react'
import {ProductPageView} from '~/features/product-page/ui/product-page-view'
import {ProductPageViewPlaceholder} from '~/features/product-page/ui/product-page-view-placeholder'
import ProductsReel from '~/features/products-reel/ui/products-reel'
import Container from '~/shared/ui/components/container'
import {api} from '~/trpc/server'

type Param = string | string[] | undefined

type Props = {
	params: {
		productSlug: string
	}
	searchParams: {
		[key: string]: Param
	}
}

async function getProduct(productSlug: string) {
	try {
		return await api.products.getProduct(productSlug)
	} catch (error) {
		return null
	}
}

export default async function ProductPage({params, searchParams}: Props) {
	const productSlug = params.productSlug
	const product = await getProduct(productSlug)
	if (!product) return notFound()

	const category = product.category

	console.log('🚀 ~ file: page.tsx:35 ~ ProductPage ~ category:', category)


	return (
		<Container className='space-y-10 py-10'>
			<section className='pt-10'>
				<React.Suspense fallback={<ProductPageViewPlaceholder />}>
					<ProductPageView product={product} />
				</React.Suspense>
			</section>

			<section>
				<React.Suspense>
					{typeof category !== 'number' && (
						<ProductsReel
							title={category.name}
							excludeProductId={product.id}
							query={{category: category.id, limit: 8}}
						/>
					)}
				</React.Suspense>
			</section>
		</Container>
	)
}
