import React from 'react'
import { AuthForm } from './auth-form'
import { Button } from '~/shared/ui/components/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import PasswordStrengthMeter from '~/features/auth/utils/password-strength-meter'
import { Input } from '~/shared/ui/components/input'
import { type SignUpFormData, signUpSchema } from '~/features/auth/validator'
import type { ControllerRenderProps } from 'react-hook-form'

export default function SignUpForm() {

  const onSubmit = (data: SignUpFormData) => {
    console.log(data)
  }

  return (
    <div className='mb-6'>
      <AuthForm<typeof signUpSchema> schema={signUpSchema} onSubmit={onSubmit} submitButtonText='Prihlásiť sa' fields={[
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Zadajte svoj e-mail'
        },
        {
          name: 'password',
          label: 'Heslo',
          type: 'password',
          placeholder: 'Zadajte svoje heslo',
          render: ({ field }) => (
            <SignUpPasswordInput field={field} />
          )
        },
        {
          name: 'confirmPassword',
          label: 'Potvrdenie hesla',
          type: 'password',
          placeholder: 'Zopakujte svoje heslo'
        },
      ]}>

      </AuthForm>
    </div>
  )
}

const SignUpPasswordInput = ({ field }: { field: ControllerRenderProps<SignUpFormData> }) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [password, setPassword] = React.useState("")
  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  return (
    <div key={field.name} className='space-y-2'>
      <div className='relative'>
        <Input
          {...field}
          type={showPassword ? 'text' : 'password'}
          className="w-full pr-10"
          onChange={(e) => {
            field.onChange(e)
            setPassword(e.target.value)
          }}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          <span className="sr-only">{showPassword ? 'Skryť heslo' : 'Zobraziť heslo'}</span>
        </Button>
      </div>
      {password && <PasswordStrengthMeter password={password} />}
    </div>
  )
}
