'use client'

import React from 'react'
import {Typography} from '~/shared/ui/components/typography'
import {useCart} from '../hooks/use-cart'
import {CartItem} from './cart-item'

export const CartItemsList = React.memo(() => {
	const items = useCart((state) => state.items)

	return (
		<React.Fragment>
			<h3 className='sr-only'>Položky vo vašom nákupnom košíku</h3>
			{items.length === 0 ? (
				<Typography variant='p' className='text-center'>
					Váš košík je prázdny
				</Typography>
			) : (
				<ul className='space-y-2'>
					{items.map(({product, quantity}) => (
						<CartItem
							key={`product-${product.id}`}
							product={product}
							quantity={quantity}
						/>
					))}
				</ul>
			)}
		</React.Fragment>
	)
})
