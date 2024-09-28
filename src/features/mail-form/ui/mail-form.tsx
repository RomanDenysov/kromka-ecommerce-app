'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
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

const mailSchema = z.object({
	email: z.string().email('Zadajte platnú e-mailovú adresu'),
})

type MailFormData = z.infer<typeof mailSchema>

export const MailForm = () => {
	const form = useForm<MailFormData>({
		resolver: zodResolver(mailSchema),
		defaultValues: {
			email: '',
		},
	})

	const onSubmit = (data: MailFormData) => {
		console.debug('MailForm:onSubmit', data)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='z-10 size-full space-y-4'>
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
									{...field}
									placeholder='Zadajte svoju e-mail addressu'
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
					Pokračovať s odberom
				</LoaderButton>
			</form>
		</Form>
	)
}
