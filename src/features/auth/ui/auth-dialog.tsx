'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import React from 'react'
import type {AuthState} from '~/features/auth/types'
import ProvidersForm from '~/features/auth/ui/providers-form'
import SignInForm from '~/features/auth/ui/sign-in-form'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '~/shared/ui/components/card'

// TODO: move to config later on (or make it dynamic)
const AUTH_CONTENT = {
	signIn: {
		title: 'Prihlásiť sa',
		description: 'Prihláste sa do svojho účtu alebo vytvorte si nový',
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
	const [state, setState] = React.useState<AuthState>(authState || 'signIn')
	const {title, description, switchText, questionText} = AUTH_CONTENT[state]

	const toggleState = () => {
		const newState = state === 'signIn' ? 'signIn' : 'signUp'
		setState(newState)
		router.push(`?authState=${newState}`, {scroll: false})
	}
	return (
		<Card className='w-[350px] sm:w-[400px]'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				{state === 'signIn' ? <SignInForm /> : <SignInForm />}

				<Divider />

				<ProvidersForm />

				{/* <div className='mt-4 inline-flex w-full items-center justify-between gap-x-2 text-sm'>
					<span>{questionText}</span>
					<button
						type='button'
						onClick={toggleState}
						className='text-muted-foreground hover:underline'>
						{switchText}
					</button>
				</div> */}
			</CardContent>
		</Card>
	)
}

const Divider = () => {
	return (
		<div className='flex w-full items-center justify-center gap-x-4 text-sm'>
			<span className='h-px w-full bg-border' />
			<span className='font-medium text-muted-foreground'>alebo</span>
			<span className='h-px w-full bg-border' />
		</div>
	)
}
