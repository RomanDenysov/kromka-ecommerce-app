'use client'

import {Loader2} from 'lucide-react'
import {signIn} from 'next-auth/react'
import React from 'react'
import {FaFacebook} from 'react-icons/fa6'
import {FcGoogle} from 'react-icons/fc'
import {Button} from '~/shared/ui/components/button'

type Props = {
	disabled?: boolean
}

export default function ProvidersForm({disabled}: Props) {
	const [loading, setLoading] = React.useState(false)

	const handleProviderClick = (provider: 'google' | 'facebook') => {
		setLoading(true)
		signIn(provider, {redirectTo: '/'}).finally(() => setLoading(false))
	}

	return (
		<div className='mt-4 flex flex-col gap-4'>
			<Button
				onClick={() => handleProviderClick('google')}
				disabled={disabled || loading}
				type='submit'
				variant={'outline'}
				size={'lg'}
				className='relative w-full text-start font-medium'>
				<FcGoogle className='-translate-y-1/2 absolute top-1/2 left-2 text-2xl' />
				{loading && <Loader2 size={20} className='mr-2 animate-spin' />}
				Pokračovať z Google
			</Button>
			<Button
				onClick={() => handleProviderClick('facebook')}
				disabled={disabled || loading}
				type='submit'
				variant={'outline'}
				size={'lg'}
				className='relative w-full text-start font-medium'>
				<FaFacebook className='-translate-y-1/2 absolute top-1/2 left-2 text-2xl text-blue-500' />
				{loading && <Loader2 size={20} className='mr-2 animate-spin' />}
				Pokračovať z Facebook
			</Button>
			<Button
				onClick={() => signIn()}
				disabled={disabled || loading}
				type='submit'
				variant={'outline'}
				size={'lg'}
				className='relative w-full text-start font-medium'>
				<FaFacebook className='-translate-y-1/2 absolute top-1/2 left-2 text-2xl text-blue-500' />
				{loading && <Loader2 size={20} className='mr-2 animate-spin' />}
				Pokračovať z ...
			</Button>
		</div>
	)
}
