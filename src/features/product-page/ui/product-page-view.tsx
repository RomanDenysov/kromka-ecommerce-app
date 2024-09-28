'use client'

import {StoreIcon} from 'lucide-react'
import React from 'react'
import {useMedia, useMountedState} from 'react-use'
import type {Product} from '~/server/payload/payload-types'
import {formatPrice} from '~/shared/lib/utils'
import {Badge} from '~/shared/ui/components/badge'
import {ImageSlider} from '~/shared/ui/components/image-slider'
import {Typography} from '~/shared/ui/components/typography'
import {AddToCartButton} from './add-to-cart-button'
import {ProductPageViewPlaceholder} from './product-page-view-placeholder'

type Props = {
	product: Product
}

export const ProductPageView = ({product}: Props) => {
	const isMobile = useMedia('(max-width: 768px)', false)
	const isMounted = useMountedState()
	const validUrls = React.useMemo(() => {
		return product.images
			.map(({image}) => typeof image !== 'number' && image.url)
			.filter(Boolean) as string[]
	}, [product])

	if (!product || !isMounted) return <ProductPageViewPlaceholder />

	const price = formatPrice(product.price)

	return (
		<div className='lg:grid lg:grid-cols-2 lg:gap-x-8'>
			<div className='space-y-4 lg:self-start'>
				<Typography variant='h2'>{product.name}</Typography>
				<Typography variant='h3'>{price}</Typography>
				<Typography variant='p'>{product.description}</Typography>
				<Typography variant='p'>{product.composition}</Typography>
				<div className='flex flex-wrap gap-x-2 gap-y-1'>
					<Badge className='flex items-center py-1 md:py-2'>
						<StoreIcon size={16} className='mr-1' />
						Kromka Prešov: (8)
					</Badge>
					<Badge
						className='flex items-center py-1 md:py-2'
						variant={'destructive'}>
						<StoreIcon size={16} className='mr-1' />
						Kromka Košice: (0)
					</Badge>
				</div>
			</div>

			<div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
				<div className='aspect-square rounded-lg'>
					<ImageSlider urls={validUrls} brightness={false} />
				</div>
			</div>

			<div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-end'>
				<>
					{isMobile ? (
						<div className='fixed inset-x-0 bottom-0 z-50 h-[68px] w-full space-y-2.5 border-gray-100 border-t bg-white px-4 py-1 sm:relative sm:bottom-auto'>
							<div className='mx-auto h-1.5 w-1/5 rounded-lg bg-gray-200' />
							<AddToCartButton product={product} />
						</div>
					) : (
						<div>
							<AddToCartButton product={product} />
						</div>
					)}
				</>
			</div>
		</div>
	)
}
