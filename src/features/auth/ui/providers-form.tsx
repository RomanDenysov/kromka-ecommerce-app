'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa6'
import { Button } from '~/shared/ui/components/button'
import { signIn } from 'next-auth/react'
import React from 'react'
import { Loader2 } from 'lucide-react'

type Props = {
  disabled?: boolean
}

export default function ProvidersForm({ disabled }: Props) {

  const [loading, setLoading] = React.useState(false)

  const handleProviderClick = (provider: "google" | "facebook") => {
    setLoading(true)
    signIn(provider, { redirectTo: '/' })
      .finally(() => setLoading(false))
  }


  return (
    <div className='flex flex-col gap-4 mt-4'>
      <Button
        onClick={() => handleProviderClick('google')}
        disabled={disabled || loading}
        type='submit'
        variant={'outline'}
        size={'lg'}
        className='w-full relative font-medium text-start'
      >
        <FcGoogle className='text-2xl absolute top-1/2 left-2 -translate-y-1/2' />
        {loading && <Loader2 size={20} className='animate-spin mr-2' />}
        Pokračovať z Google
      </Button>
      <Button
        onClick={() => handleProviderClick('facebook')}
        disabled={disabled || loading}
        type='submit'
        variant={'outline'}
        size={'lg'}
        className='w-full relative font-medium text-start'
      >
        <FaFacebook className='text-2xl absolute top-1/2 left-2 -translate-y-1/2 text-blue-500' />
        {loading && <Loader2 size={20} className='animate-spin mr-2' />}
        Pokračovať z Facebook
      </Button>
    </div >
  )
}
