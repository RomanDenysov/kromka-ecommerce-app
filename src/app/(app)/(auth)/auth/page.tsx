
import Image from 'next/image'
import React from 'react'
import AuthDialog from '~/features/auth/ui/auth-dialog'

export default function AuthPage() {
	return (
		<section className='relative m-auto grid size-full min-h-screen place-items-center bg-background'>
			<div className='z-40'>
				<React.Suspense fallback={null}>
					<AuthDialog />
				</React.Suspense>
			</div>
			<Image
				src={'/images/KROMKA_VYKLAD.webp'}
				alt='Kromka vyklad Kosice'
				fill
				className='absolute object-cover object-center blur-[2px] brightness-75 saturate-50'
				loading='lazy'
			/>
		</section>
	)
}
