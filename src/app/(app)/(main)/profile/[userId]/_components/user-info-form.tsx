'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {type UserInfoFormData, userInfoSchema} from '~/features/checkout/models'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/shared/ui/components/card'
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
import {LoaderButton} from '~/shared/ui/components/loader-button'

export const UserInfoForm = () => {
	const form = useForm<UserInfoFormData>({
		defaultValues: {
			name: 'Jane Doe',
			email: 'jane.doe@example.com',
			phone: '+42077777777',
		},
		resolver: zodResolver(userInfoSchema),
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Osobné údaje užívateľa</CardTitle>
				<CardDescription>Toto je osobné údaje užívateľa</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className='grid gap-x-2 gap-y-4 md:grid-cols-2 md:gap-x-6'>
						<FormField
							control={form.control}
							name='email'
							render={({field}) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											disabled={form.formState.isSubmitting}
											type='email'
											autoComplete='email'
											placeholder='Zadajte svoju e-mail addressu'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='name'
							render={({field}) => (
								<FormItem>
									<FormLabel>Meno</FormLabel>
									<FormControl>
										<Input
											disabled={form.formState.isSubmitting}
											type='text'
											autoComplete='name'
											placeholder='Zadajte svoju e-mail addressu'
											{...field}
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
								<FormItem>
									<FormLabel>Telefonne číslo</FormLabel>
									<FormControl>
										<Input
											disabled={form.formState.isSubmitting}
											type='text'
											autoComplete='phone'
											placeholder='Zadajte svoje telefonne číslo'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='col-span-2 flex flex-col gap-y-4 pt-4 pl-2'>
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
			</CardContent>
			<CardFooter className='justify-end'>
				<LoaderButton isLoading={false} size={'lg'} type='submit'>
					Upraviť osobné údaje
				</LoaderButton>
			</CardFooter>
		</Card>
	)
}
