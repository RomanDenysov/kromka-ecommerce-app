import Image from 'next/image'
import AuthDialog from '~/features/auth/ui/auth-dialog'

export default function AuthPage() {
	return (
		<section className='relative m-auto grid size-full min-h-screen place-items-center'>
			<div className='z-40'>
				<AuthDialog />
				relative m-auto grid
			</div>
			<Image
				src={'/images/KROMKA_VYKLAD.webp'}
				alt='Kromka vyklad Kosice'
				fill
				className='absolute object-cover object-center blur-[3px] brightness-75 saturate-50'
				loading='lazy'
			/>
			blur-[3px]
		</section>
	)
}
