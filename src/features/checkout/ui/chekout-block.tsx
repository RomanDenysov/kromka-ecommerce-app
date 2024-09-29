'use client'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {CheckoutInfo} from '~/features/checkout/ui/checkout-info'
import {CheckoutOptions} from '~/features/checkout/ui/checkout-options'
import {CheckoutSummary} from '~/features/checkout/ui/checkout-summary'

const checkoutSchema = z.object({
	email: z.string().email('Zadajte platnú e-mailovú adresu'),
	phone: z.string().min(10, 'Telefónne číslo je povinné'),
	terms: z.boolean().refine((data) => data === true, {
		message: 'Musíte prijať podmienky používania',
		path: ['terms'],
	}),
	paymentMethod: z.string().min(1, 'Platobný spôsob je povinný'),
	store: z.object({
		name: z.string().min(1, 'Názov obchodu je povinný'),
	}),
	pickupDate: z
		.date({
			required_error: 'Dátum vyzdvihnutia je povinný',
			invalid_type_error: 'Neplatný dátum vyzdvihnutia',
		})
		.optional(),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export default function CheckoutBlock() {
	const defaultValues = {
		email: '',
		phone: '',
		terms: false,
		paymentMethod: 'inStore',
		store: {name: ''},
		pickupDate: new Date(),
	}

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutSchema),
		defaultValues,
	})

	return (
		<div>
			<div className='space-y-4'>
				<CheckoutInfo />
				<CheckoutOptions />
				<CheckoutSummary />
			</div>
		</div>
	)
}
