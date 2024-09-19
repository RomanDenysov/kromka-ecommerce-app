import {zodResolver} from '@hookform/resolvers/zod'
import {signIn} from 'next-auth/react'
import {useForm} from 'react-hook-form'
import {type EmailFormData, emailSchema} from '~/features/auth/validator'
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

export default function SignInForm() {
	const form = useForm<EmailFormData>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: '',
		},
	})

	const onSubmit = (data: EmailFormData) => {
		signIn('nodemailer', {redirectTo: '/', email: data.email})
		console.debug('SignInForm:onSubmit', data)
	}

	return (
		<div className='mb-6'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
					<LoaderButton
						size={'lg'}
						className='w-full font-medium'
						type='submit'
						isLoading={form.formState.isSubmitting}>
						Pokračovať z Email
					</LoaderButton>
				</form>
			</Form>
		</div>
	)
}
