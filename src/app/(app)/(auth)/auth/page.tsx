import React from 'react'
import BGImage from '../../../../../public/images/KROMKA_VYKLAD.webp'
import Image from 'next/image'
import AuthDialog from '~/features/auth/ui/auth-dialog'

export default function AuthPage() {
  return (
    <section className='size-full min-h-screen m-auto grid place-items-center relative'>
      <div className='z-40'>
        <AuthDialog />
      </div>
      <Image src={'/images/KROMKA_VYKLAD.webp'} alt="Kromka vyklad Kosice" fill className='absolute object-cover object-center brightness-75 saturate-50 blur-[3px]' loading='lazy' />
    </section>
  )
}
