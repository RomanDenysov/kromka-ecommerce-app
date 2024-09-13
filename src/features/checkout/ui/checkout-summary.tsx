'use client'

import {Loader2} from 'lucide-react'
import {useCart} from '~/features/cart-page-view/hooks/use-cart'
import {formatPrice} from '~/shared/lib/utils'
import {Typography} from '~/shared/ui/components/typography'

export const CheckoutSummary = () => {
	const items = useCart((state) => state.items)

	const price = items.reduce((acc, item) => {
		return acc + item.product.price * item.quantity
	}, 0)

	const discount = 0
	const delivery = 0
	const totalPrice = price + delivery - discount

	const renderPrice = {
		subtotal: {
			label: 'Medzisúčet',
			value: formatPrice(totalPrice),
		},
		delivery: {
			label: 'Doručenie',
			value: formatPrice(delivery),
		},
		discount: {
			label: 'Zľava',
			value: formatPrice(discount),
		},
		totalPrice: {
			label: 'Spolu',
			value: formatPrice(totalPrice),
		},
	}

	return (
		<div className='rounded-md bg-accent p-6 shadow-sm'>
			<h3 className='sr-only'>Prehľad objednávky</h3>
			<Typography variant='h4' className='mb-4 text-muted-foreground'>
				Prehľad objednávky
			</Typography>

			<div className='space-y-4'>
				<div className='flex items-center justify-between border-border border-b'>
					<Typography variant='regular' className='text-muted-foreground'>
						{renderPrice.subtotal.label}
					</Typography>
					<Typography variant='regular' className='text-muted-foreground'>
						{renderPrice ? (
							renderPrice.subtotal.value
						) : (
							<Loader2
								size={16}
								className='animate-spin text-muted-foreground'
							/>
						)}
					</Typography>
				</div>
				{/* <div className='flex items-center border-b border-border justify-between'>
          <Typography variant='regular' >
            {renderPrice.delivery.label}
          </Typography>
          <Typography variant='regular' className='text-muted-foreground'>
            {renderPrice ? renderPrice.delivery.value : <Loader2 size={16} className='animate-spin text-muted-foreground' />}
          </Typography>
        </div> */}
				<div className='flex items-center justify-between border-border border-b'>
					<Typography variant='regular'>
						{renderPrice.discount.label}
					</Typography>
					<Typography variant='regular'>
						{renderPrice ? (
							renderPrice.discount.value
						) : (
							<Loader2
								size={16}
								className='animate-spin text-muted-foreground'
							/>
						)}
					</Typography>
				</div>
				<div className='flex items-center justify-between'>
					<Typography variant='h5'>{renderPrice.totalPrice.label}</Typography>
					<Typography variant='h5'>
						{renderPrice ? (
							renderPrice.totalPrice.value
						) : (
							<Loader2
								size={16}
								className='animate-spin text-muted-foreground'
							/>
						)}
					</Typography>
				</div>
			</div>
		</div>
	)
}
