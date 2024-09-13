import {ImageIcon, MinusIcon, PlusIcon, X} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type {Product} from '~/payload/payload-types'
import {formatPrice} from '~/shared/lib/utils'
import {Typography} from '~/shared/ui/components/typography'
import {useCart} from '../hooks/use-cart'

type Props = {
	product: Product
	quantity: number
}

export const CartItem = ({product, quantity}: Props) => {
	const removeItem = useCart((state) => state.removeItem)
	const addItem = useCart((state) => state.addItem)

	const handleRemoveItem = () => removeItem(product.id)
	const increaseItemQuantity = () => addItem({product, quantity: +1})
	const decreaseItemQuantity = () => {
		if (quantity > 1) {
			addItem({product, quantity: -1})
		} else {
			handleRemoveItem()
		}
	}

	if (!product) return null

	const price = formatPrice(product.price * quantity)

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
		<li className='flex border-t py-2 sm:py-4'>
			<div className='flex-shrink-0'>
				<div className='relative size-36 shadow-md sm:size-48'>
					<Link href={`/products/${product.slug}`}>{renderImage()}</Link>
				</div>
			</div>

			<div className='ml-4 flex h-36 w-full flex-col justify-between sm:ml-6 sm:h-48'>
				<div className='relative grid size-full content-between pr-9 sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
					<div className=''>
						<Typography variant='h6' className='mb-2'>
							{product.name}
						</Typography>

						<Typography variant='h5' className='mb-2 text-muted-foreground'>
							{formatPrice(product.price)}
						</Typography>

						{/* TODO: Add current inventory status */}
					</div>

					<div className='absolute top-0 right-0 flex'>
						<button
							type='button'
							// TODO: Add remove from cart confirmation later by useConfirm hook
							onClick={() => removeItem(product.id)}
							className='rounded-md hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 focus:ring-offset-white'>
							<X className='size-6 flex-shrink-0' />
						</button>
					</div>

					<div className='col-span-2 mb-0,5 flex items-center justify-between gap-x-2'>
						<div className='flex items-center justify-between gap-x-4'>
							<button
								type='button'
								onClick={decreaseItemQuantity}
								className='rounded-md hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 focus:ring-offset-white'>
								<MinusIcon className='size-6 flex-shrink-0' />
							</button>

							<Typography variant='span' className=''>
								{quantity}
							</Typography>

							<button
								type='button'
								onClick={increaseItemQuantity}
								className='rounded-md hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 focus:ring-offset-white'>
								<PlusIcon className='size-6 flex-shrink-0' />
							</button>
						</div>

						<div className='absolute right-0.5 bottom-0 flex items-start'>
							<Typography
								variant='h5'
								className='text-muted-foreground sm:mr-2'>
								{price}
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</li>
	)
}
