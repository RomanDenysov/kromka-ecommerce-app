'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {useDebounce} from 'react-use'
import {useUser} from '~/features/user/hooks/use-user'
import {Checkbox} from '~/shared/ui/components/checkbox'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/shared/ui/components/form'
import {Input} from '~/shared/ui/components/input'
import {Typography} from '~/shared/ui/components/typography'
import {type UserInfoFormData, userInfoSchema} from '../models'

export const CheckoutInfo = () => {
	const user = useUser((state) => state.user)
	const setUser = useUser((state) => state.setUser)

	const defaultValues = {
		name: user?.name || '',
		email: user?.email || '',
		phone: user?.phone || '',
		terms: user?.acceptedTerms || false,
	}

	const form = useForm<UserInfoFormData>({
		resolver: zodResolver(userInfoSchema),
		reValidateMode: 'onChange',
		defaultValues: defaultValues,
	})

	const formValues = form.watch()

	useDebounce(
		() => {
			setUser(formValues)
		},
		500,
		[formValues],
	)

	return (
		<div className='rounded-md bg-accent p-6 shadow-sm'>
			<h3 className='sr-only'>Prehľad objednávky</h3>
			<Typography variant='h3' className='mb-4'>
				Prehľad objednávky
			</Typography>
			<div className='space-y-4 pt-4'>
				<Form {...form}>
					<form className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({field}) => (
								<FormItem>
									<FormLabel>Meno</FormLabel>
									<FormControl>
										<Input
											type='text'
											autoComplete='name'
											{...field}
											placeholder='Zadajte svoe meno'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({field}) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type='email'
											autoComplete='email'
											{...field}
											placeholder='Zadajte svoj e-mail'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phone'
							render={({field}) => (
								<FormItem className='mb-4'>
									<FormLabel>Telefonne číslo</FormLabel>
									<FormControl>
										<Input
											type='text'
											autoComplete='phone'
											{...field}
											placeholder='Zadajte svoe telefonne číslo'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='mt-4'>
							<FormField
								control={form.control}
								name='terms'
								render={({field}) => (
									<FormItem className='flex flex-row items-center space-x-2 space-y-0'>
										<FormControl>
											<Checkbox
												id='terms'
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel className='font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
											Suhlasim z{' '}
											<Link
												href='/privacy-policy'
												className='text-primary hover:underline'>
												obchodnymi podmienkami
											</Link>
										</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
