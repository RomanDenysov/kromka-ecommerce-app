import {zodResolver} from '@hookform/resolvers/zod'
import {useRouter} from 'next/navigation'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
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
import {api} from '~/trpc/react'

export default function SignInForm() {
	const router = useRouter()
	const form = useForm<EmailFormData>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: '',
		},
	})

	const loginEmail = api.users.loginEmail.useMutation({
		onSuccess: ({success, emailLink}) => {
			console.log(
				'🚀 ~ file: sign-in-form.tsx:30 ~ SignInForm ~ redirect:',
				emailLink,
			)

			if (!success) {
				toast.success('Prihlásovaci link bol odoslaný na email', {
					action: {
						label: 'Prejst na email',
						onClick: () => {
							router.push(emailLink ?? '')
						},
					},
				})
			}
		},
		onError: (error) => {
			toast.error('Prihlásenie zlyhalo')
			console.error('SignInForm:onError', error)
		},
	})

	const onSubmit = ({email}: EmailFormData) => {
		loginEmail.mutate({email})
		console.debug('SignInForm:onSubmit', email)
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
						isLoading={loginEmail.isPending}>
						Pokračovať z Email
					</LoaderButton>
				</form>
			</Form>
		</div>
	)
}
