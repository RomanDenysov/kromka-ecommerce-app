'use client'
import {InfoBlock} from '~/shared/ui/components/info-block'
import {TooltipProvider} from '~/shared/ui/components/tooltip'
import {Typography} from '~/shared/ui/components/typography'
import {useCheckout} from '../hooks/use-checkout'
import {DatePicker} from './date-picker'
import {PaymentMethod} from './payment-method'

export const CheckoutOptions = () => {
	const setCheckout = useCheckout((state) => state.setCheckout)
	const checkout = useCheckout((state) => state.checkout)

	const handleMethodSelect = (value: string) => {
		setCheckout({paymentMethod: value as 'inStore' | 'card'})
	}

	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			setCheckout({pickupDate: date})
		}
	}

	return (
		<div className='rounded-md bg-accent p-6 shadow-sm'>
			<TooltipProvider>
				<h3 className='sr-only'>
					Vyberte si dátum a podnik pre odber objednávky
				</h3>
				<Typography variant='h4' className='mb-4 text-muted-foreground'>
					Vyberte si dátum a podnik pre odber objednávky
				</Typography>

				<div className='flex items-center justify-center'>
					<div className='w-full max-w-[400px] space-y-4 sm:max-w-full'>
						<div className='space-y-2'>
							<InfoBlock
								title='Dátum a čas'
								description='Vyberte si dátum a čas pre odber objednávky'
							/>
							<DatePicker onDateSelect={handleDateSelect} />
						</div>

						<div className='space-y-2'>
							<InfoBlock
								title='Zvolte si sposób platby'
								description='Pri osobnom odbere na predajne da sa platit aj v hotovosti aj kartou.'
							/>
							<PaymentMethod
								onMethodSelect={handleMethodSelect}
								defaultValue={checkout.paymentMethod}
							/>
						</div>
					</div>
				</div>
			</TooltipProvider>
		</div>
	)
}
