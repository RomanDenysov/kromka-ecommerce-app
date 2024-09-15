import {MinusIcon, PlusIcon} from 'lucide-react'
import type {Product} from '~/payload/payload-types'
import {formatPrice} from '~/shared/lib/utils'
import {Typography} from '~/shared/ui/components/typography'
import {useCart} from '../hooks/use-cart'

type Props = {
	product: Product
	quantity: number
}

export const ItemQuantityButton = ({product, quantity}: Props) => {
	const addItem = useCart((state) => state.addItem)
	const removeItem = useCart((state) => state.removeItem)

	const price = formatPrice(product.price * quantity)

	const increaseItemQuantity = () => addItem({product, quantity: +1})
	const decreaseItemQuantity = () => {
		if (quantity > 1) {
			addItem({product, quantity: -1})
		} else {
			removeItem(product.id)
		}
	}

	return (
		<div className='flex items-center justify-between gap-x-2 sm:items-end '>
			<div className='flex max-h-[40px] items-center justify-between rounded-md border border-border bg-background shadow-sm'>
				<button
					type='button'
					onClick={decreaseItemQuantity}
					className='flex-1 rounded-l-md p-1 hover:bg-accent sm:p-2 '>
					<MinusIcon className='size-6 flex-shrink-0' />
				</button>

				<Typography variant='span' className='flex-1 px-1.5 py-1 sm:px-2.5'>
					{quantity}
				</Typography>

				<button
					type='button'
					onClick={increaseItemQuantity}
					className='flex-1 rounded-r-md p-1 hover:bg-accent sm:p-2'>
					<PlusIcon className='size-6 flex-shrink-0' />
				</button>
			</div>

			<Typography variant='h5' className='text-muted-foreground'>
				{price}
			</Typography>
		</div>
	)
}
