'use client'

import {ShoppingCartIcon} from 'lucide-react'
import {Badge} from '~/shared/ui/components/badge'
import {Button} from '~/shared/ui/components/button'
import {useCart} from '../../cart-page-view/hooks/use-cart'
import {useCartSheet} from '../hooks/use-cart-sheet'

const CartButton = () => {
	const onOpen = useCartSheet((state) => state.onOpen)
	const items = useCart((state) => state.items)
	const totalQuantity: number = items.reduce(
		(total, item) => total + item.quantity,
		0,
	)

	return (
		<Button
			onClick={onOpen}
			variant={'ghost'}
			size={'icon'}
			className='relative grid size-9 place-items-center rounded-full'>
			<ShoppingCartIcon size={24} />
			{totalQuantity >= 1 && (
				<Badge className='absolute top-0 right-0 px-0.5 py-0'>
					{totalQuantity}
				</Badge>
			)}
		</Button>
	)
}

export default CartButton
