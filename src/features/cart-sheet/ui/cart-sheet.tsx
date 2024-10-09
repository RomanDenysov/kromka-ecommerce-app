'use client'

import {ChevronRight} from 'lucide-react'
import Link from 'next/link'
import {formatPrice} from '~/shared/lib/utils'
import {buttonVariants} from '~/shared/ui/components/button'
import {ScrollArea} from '~/shared/ui/components/scroll-area'
import {Separator} from '~/shared/ui/components/separator'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '~/shared/ui/components/sheet'
import {useCart} from '../../cart-page-view/hooks/use-cart'
import {useCartSheet} from '../hooks/use-cart-sheet'
import {CartSheetItem} from './cart-sheet-item'

export const CartSheet = () => {
	const {isOpen, onClose} = useCartSheet((state) => ({
		isOpen: state.isOpen,
		onClose: state.onClose,
	}))

	const products = useCart((state) => state.items)

	const totalQuantity = products?.reduce((acc, item) => acc + item.quantity, 0)
	const totalPrice = products?.reduce(
		(acc, item) => acc + item.product.price * item.quantity,
		0,
	)

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='flex flex-col px-4'>
				<SheetHeader>
					<SheetTitle>Košík ({totalQuantity})</SheetTitle>
					<SheetDescription hidden>Stav košíka</SheetDescription>
				</SheetHeader>

				{products ? (
					<>
						<ScrollArea className='pr-2.5'>
							<div className='flex h-full w-full flex-col'>
								{products.map(({product, quantity}) => (
									<CartSheetItem
										product={product}
										quantity={quantity}
										key={product.id}
									/>
								))}
							</div>
						</ScrollArea>
						<div className='space-y-4'>
							<Separator />
							<div className='space-y-1.5'>
								<div className='flex'>
									<span className='flex-1 font-normal text-lg tracking-tight'>
										<b>SPOLU</b> (s DPH)
									</span>

									<span className='font-bold text-xl tracking-tight'>
										{formatPrice(totalPrice)}
									</span>
								</div>
							</div>

							<SheetFooter>
								<SheetTrigger asChild>
									<Link
										href='/cart'
										className={buttonVariants({
											className: 'w-full',
											size: 'lg',
										})}>
										Prejsť k pokladni
									</Link>
								</SheetTrigger>
							</SheetFooter>
						</div>
					</>
				) : (
					<div className='flex h-full flex-col items-center justify-center space-y-1 px-6'>
						<div
							aria-hidden='true'
							className='relative mb-4 flex h-60 w-60 flex-col items-center justify-center gap-y-6 text-muted-foreground'>
							<h2 className='font-semibold text-2xl'>Váš košík je prázdny</h2>
							<div className='px-6'>
								<SheetTrigger asChild>
									<Link
										href='/products'
										className={buttonVariants({
											variant: 'link',
											size: 'lg',
											className:
												'flex w-full items-center text-lg text-muted-foreground underline hover:text-red-500',
										})}>
										Prejsť k nakupu <ChevronRight className='ml-2 size-4' />
									</Link>
								</SheetTrigger>
							</div>
						</div>
					</div>
				)}
			</SheetContent>
		</Sheet>
	)
}
