import {CartItemsList} from '~/features/cart-page-view/ui/cart-items-list'
import {CheckoutOptions} from '~/features/checkout/ui/checkout-options'
import {CheckoutSummary} from '~/features/checkout/ui/checkout-summary'
import Container from '~/shared/ui/components/container'
import {Heading} from '~/shared/ui/components/heading'

export default function CartPage() {
	return (
		<Container className='space-y-10 py-10'>
			<Heading title='Vašespace-yákuppyžky' subtitle='Váš košík je prázdny' />
			<div className='lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12'>
				<section className='mb-6 sm:mb-0 lg:col-span-8 lg:row-start-1'>
					<CartItemsList />
					mb-6 sm:mb-0
				</section>

				<section className='lg:col-span-4 lg:row-start-1'>
					<div className='space-y-4'>
						{/* <CheckoutInfo /> */}
						<CheckoutOptions />
						<CheckoutSummary />
					</div>
				</section>
			</div>
		</Container>
	)
}
