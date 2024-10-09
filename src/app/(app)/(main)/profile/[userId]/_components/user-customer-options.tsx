'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import {CreditCardIcon, StoreIcon} from 'lucide-react'
import React from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/shared/ui/components/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/shared/ui/components/form'
import {Label} from '~/shared/ui/components/label'
import {LoaderButton} from '~/shared/ui/components/loader-button'
import {RadioGroup, RadioGroupItem} from '~/shared/ui/components/radio-group'
import {Typography} from '~/shared/ui/components/typography'

const userOptionsSchema = z.object({
	checkout: z.enum(['inStore', 'card']),
})

type UserOptionsFormData = z.infer<typeof userOptionsSchema>

export const UserCustomerOptions = () => {
	const form = useForm<UserOptionsFormData>({
		defaultValues: {
			checkout: 'inStore',
		},
		resolver: zodResolver(userOptionsSchema),
	})
	const checkoutDefaultValue = form.watch('checkout')
	const [value, setValue] = React.useState<string>(checkoutDefaultValue)

	console.log(
		'🚀 ~ file: user-customer-options.tsx:45 ~ UserCustomerOptions ~ value:',
		value,
	)

	return (
		<Card>
			<CardHeader>
				<CardTitle>Osobné údaje užívateľa</CardTitle>
				<CardDescription>Toto je osobné údaje užívateľa</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className=''>
						<FormField
							control={form.control}
							name='checkout'
							render={({field}) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<RadioGroup
											value={value}
											className='grid grid-cols-2 gap-4'
											onValueChange={(value) => setValue(value)}>
											<div>
												<RadioGroupItem
													id='inStore'
													value='inStore'
													className='peer sr-only'
												/>
												<Label
													htmlFor='inStore'
													className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
													<StoreIcon
														size={28}
														className='mb-3 text-muted-foreground'
													/>
													<Typography variant='span' className='text-balance'>
														Pri odbere
													</Typography>
												</Label>
											</div>
											<div>
												<RadioGroupItem
													id='card'
													value='card'
													className='peer sr-only'
												/>
												<Label
													htmlFor='card'
													className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
													<CreditCardIcon
														size={28}
														className='mb-3 text-muted-foreground'
													/>
													<Typography variant='span' className='text-balance'>
														Kartou
													</Typography>
												</Label>
											</div>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</CardContent>
			<CardFooter className='justify-end'>
				<LoaderButton isLoading={false} size={'lg'} type='submit'>
					Upraviť osobné údaje
				</LoaderButton>
			</CardFooter>
		</Card>
	)
}
