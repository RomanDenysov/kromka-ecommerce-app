'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import {useForm} from 'react-hook-form'
import {useDebounce} from 'react-use'
import {useUser} from '~/features/user/hooks/use-user'
import {cn} from '~/shared/lib/utils'
import {buttonVariants} from '~/shared/ui/components/button'
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
import {Separator} from '~/shared/ui/components/separator'
import {Typography} from '~/shared/ui/components/typography'
import {type UserInfoFormData, userInfoSchema} from '../models'

export const CheckoutInfo = () => {
const user = useUser((state) => state.user)
const setUser = useUser((state) => state.setUser)

const defaultValues = React.useMemo(
	() => ({
		name: user?.name || '',
		email: user?.email || '',
		phone: user?.phone || '',
		terms: user?.acceptedTerms || false,
	}),
	[user],
)

const form = useForm<UserInfoFormData>({
	resolver: zodResolver(userInfoSchema),
	defaultValues,
})

React.useEffect(() => {
	form.reset(defaultValues)
}, [defaultValues, form])

const formValues = form.watch()

useDebounce(
	() => {
		if (form.formState.isValid) {
			setUser({
				...user,
				name: formValues.name,
				email: formValues.email,
				phone: formValues.phone,
				acceptedTerms: formValues.terms,
			})
		}
	},
	500,
	[formValues, setUser, user, form.formState.isValid],
)

return (
	<div className='rounded-md bg-accent p-6 shadow-sm'>
		<h3 className='sr-only'>Prehľad objednávky</h3>
		<Typography variant='h4' className='mb-4 text-muted-foreground'>
			Prehľad objednávky
		</Typography>
		<div className='mb-6 space-y-4'>
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
							<FormItem className='mb-2'>
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
					<div className='pt-4'>
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
											className='text-primary underline hover:text-muted-foreground'>
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

		<div className='w-full text-center'>
			<Separator className='mb-4' />
			<Typography variant='span' className='text-muted-foreground'>
				alebo prihlaste sa do svojho účtu
			</Typography>
			<Link
				href={{pathname: '/auth', query: {authState: 'signIn'}}}
				className={cn(
					buttonVariants({variant: 'outline', size: 'lg'}),
					'mt-4 w-full',
				)}>
				Prihlásiť sa
			</Link>
		</div>
	</div>
)
}
