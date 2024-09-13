'use client'

import {CreditCardIcon, StoreIcon} from 'lucide-react'
import {Label} from '~/shared/ui/components/label'
import {RadioGroup, RadioGroupItem} from '~/shared/ui/components/radio-group'
import {Typography} from '~/shared/ui/components/typography'

type Props = {
	onMethodSelect: (value: string) => void
	defaultValue?: string
}

export const PaymentMethod = ({onMethodSelect, defaultValue}: Props) => {
	return (
		<RadioGroup
			value={defaultValue || 'inStore'}
			className='grid grid-cols-2 gap-4'
			onValueChange={onMethodSelect}>
			<div>
				<RadioGroupItem id='inStore' value='inStore' className='peer sr-only' />
				<Label
					htmlFor='inStore'
					className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
					<StoreIcon size={28} className='mb-3 text-muted-foreground' />
					<Typography variant='span' className='text-balance'>
						Pri odbere
					</Typography>
				</Label>
			</div>
			<div>
				<RadioGroupItem id='card' value='card' className='peer sr-only' />
				<Label
					htmlFor='card'
					className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
					<CreditCardIcon size={28} className='mb-3 text-muted-foreground' />
					<Typography variant='span' className='text-balance'>
						Kartou
					</Typography>
				</Label>
			</div>
		</RadioGroup>
	)
}
