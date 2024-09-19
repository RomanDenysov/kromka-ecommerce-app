import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import type {DefaultValues} from 'react-hook-form'
import type {z} from 'zod'
import type {AuthFormProps} from '~/features/auth/types'
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

export function AuthForm<T extends z.ZodType>({
	schema,
	onSubmit,
	submitButtonText,
	fields,
	children,
}: AuthFormProps<T>) {
	const defaultValues = {} as DefaultValues<z.infer<T>>

	for (const field of fields) {
		defaultValues[field.name] = ''
	}

	const form = useForm<z.infer<T>>({
		resolver: zodResolver(schema),
		defaultValues,
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
				{fields.map((field) => (
					<FormField
						key={field.name}
						control={form.control}
						name={field.name}
						render={({field: fieldProps}) => (
							<FormItem>
								<FormLabel>{field.label}</FormLabel>
								<FormControl>
									{field.render ? (
										field.render({field: fieldProps})
									) : (
										<Input
											disabled={form.formState.isSubmitting}
											type={field.type}
											autoComplete={field.name}
											{...fieldProps}
											placeholder={field.placeholder}
										/>
									)}
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				{children}
				<LoaderButton
					size={'lg'}
					className='w-full font-medium'
					type='submit'
					isLoading={form.formState.isSubmitting}>
					{submitButtonText}
				</LoaderButton>
			</form>
		</Form>
	)
}
