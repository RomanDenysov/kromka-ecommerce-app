import {CartItemsList} from '~/features/cart-page-view/ui/cart-items-list'
import {CartTitleCounter} from '~/features/cart-page-view/ui/cart-title-counter'
import CheckoutBlock from '~/features/checkout/ui/chekout-block'
import Container from '~/shared/ui/components/container'

export default function CartPage() {

	return (
		<Container className='space-y-6 py-10'>
			<CartTitleCounter />
			<div className='lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12'>
				<section className='mb-6 md:col-span-7 md:mb-0 lg:col-span-8 lg:row-start-1'>
					<CartItemsList />
				</section>

				<section className='md:col-span-4 lg:col-span-5 lg:row-start-1'>
					<CheckoutBlock />
				</section>
			</div>
		</Container>
	)
}
