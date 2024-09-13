import {AuthForm} from '~/features/auth/ui/auth-form'
import {type LoginFormData, loginSchema} from '~/features/auth/validator'

export default function SignInForm() {
	const onSubmit = (data: LoginFormData) => {
		console.debug('SignInForm:onSubmit', data)
	}

	return (
		<div className='mb-6'>
			<AuthForm<typeof loginSchema>
				schema={loginSchema}
				onSubmit={onSubmit}
				submitButtonText='Prihlásiť sa'
				fields={[
					{
						name: 'email',
						label: 'Email',
						type: 'email',
						placeholder: 'Zadajte svoj e-mail',
					},
					{
						name: 'password',
						label: 'Heslo',
						type: 'password',
						placeholder: 'Zadajte svoje heslo',
					},
				]}
			/>
		</div>
	)
}
