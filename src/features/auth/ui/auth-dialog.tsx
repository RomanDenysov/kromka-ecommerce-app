'use client'

import React from 'react'
import SignInForm from '~/features/auth/ui/sign-in-form'
import SignUpForm from '~/features/auth/ui/sign-up-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/shared/ui/components/card'
import ProvidersForm from '~/features/auth/ui/providers-form'
import { useRouter, useSearchParams } from 'next/navigation'
import type { AuthState } from '~/features/auth/types'


// TODO: move to config later on (or make it dynamic)
const AUTH_CONTENT = {
  signIn: {
    title: 'Prihlásiť sa',
    description: 'Prihláste sa do svojho účtu',
    switchText: 'Vytvoriť účet',
    questionText: 'Nemáte žiadne konto?',
  },
  signUp: {
    title: 'Registrovať sa',
    description: 'Vytvorte si účet',
    switchText: 'Prihlásiť sa',
    questionText: 'Už máte účet?',
  },
}

export default function AuthDialog() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const authState = searchParams.get('authState') as AuthState | null
  const [state, setState] = React.useState<AuthState>(authState || 'signUp')
  const { title, description, switchText, questionText } = AUTH_CONTENT[state]

  const toggleState = () => {
    const newState = state === 'signIn' ? 'signUp' : 'signIn'
    setState(newState)
    router.push(`?authState=${newState}`, { scroll: false })
  }
  return (
    <Card className='w-[350px] sm:w-[400px]'>
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state === 'signIn' ? <SignInForm /> : <SignUpForm />}

        <Divider />

        <ProvidersForm />

        <div className='inline-flex items-center justify-between gap-x-2 text-sm w-full mt-4'>
          <span>
            {questionText}
          </span>
          <button type='button' onClick={toggleState} className='text-muted-foreground hover:underline'>
            {switchText}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

const Divider = () => {
  return (
    <div className='flex items-center justify-center gap-x-4 text-sm w-full'>
      <span className='w-full h-px bg-border' />
      <span className='font-medium text-muted-foreground'>alebo</span>
      <span className='w-full h-px bg-border' />
    </div>
  )
}