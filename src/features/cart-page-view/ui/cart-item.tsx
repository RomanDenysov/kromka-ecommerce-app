import {ImageIcon, X} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type {Product} from '~/payload/payload-types'
import {useConfirm} from '~/shared/hooks/use-confirm'
import {formatPrice} from '~/shared/lib/utils'
import {Typography} from '~/shared/ui/components/typography'
import {useCart} from '../hooks/use-cart'
import {ItemQuantityButton} from './item-quantity-button'

type Props = {
	product: Product
	quantity: number
}

export const CartItem = ({product, quantity}: Props) => {
	const [ConfirmDialog, confirm] = useConfirm(
		'Zmazat položku',
		'Opravdu chcete smazat tuto položku z košíku?',
	)
	const removeItem = useCart((state) => state.removeItem)

	const handleRemoveItem = async () => {
		const ok = await confirm()
		if (ok) {
			removeItem(product.id)
		}
	}

	if (!product) return null

	const {image} = product.images[0] ?? {image: null}

	const renderImage = () => {
		if (image && typeof image !== 'number' && image?.url) {
			return (
				<Image
					src={image.url}
					alt={product.name}
					fill
					className='size-full rounded-md object-cover object-center shadow-md'
				/>
			)
		}
		return (
			<div className='flex h-full items-center justify-center bg-secondary'>
				<ImageIcon
					size={40}
					aria-hidden='true'
					className='text-muted-foreground'
				/>
			</div>
		)
	}

	return (
		<>
			<ConfirmDialog />
			<li className='flex border-t py-2 sm:py-4'>
				<div className='flex-shrink-0'>
					<div className='relative size-36 shadow-md sm:size-48'>
						<Link href={`/products/${product.slug}`}>{renderImage()}</Link>
					</div>
				</div>

				<div className='ml-4 flex h-36 w-full flex-col justify-between sm:ml-6 sm:h-48'>
					<div className='relative grid size-full content-between pr-0.5 sm:grid-cols-2 sm:gap-x-6'>
						<div className=''>
							<Typography variant='h6' className='mb-1 line-clamp-2 sm:mb-2'>
								{product.name}
							</Typography>

							<Typography
								variant='h5'
								className='mb-1 text-muted-foreground sm:mb-2'>
								{formatPrice(product.price)}
							</Typography>

							{/* TODO: Add current inventory status */}
						</div>

						<div className='absolute top-0 right-0.5 flex'>
							<button
								type='button'
								// TODO: Add remove from cart confirmation later by useConfirm hook
								onClick={handleRemoveItem}
								className='rounded-md hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 focus:ring-offset-white'>
								<X className='size-6 flex-shrink-0' />
							</button>
						</div>

						<div className='col-span-2 mb-0,5'>
							<ItemQuantityButton product={product} quantity={quantity} />
						</div>
					</div>
				</div>
			</li>
		</>
	)
}
