import Image from 'next/image'
import {MailForm} from '~/features/mail-form/ui/mail-form'
import {Typography} from '~/shared/ui/components/typography'

export default function SubscribeCart() {
	const title = 'O nás'
	const descr = 'Lorem ipsum dolor sit amet'

	return (
		<section className='group relative flex aspect-auto min-h-[80px] w-fulloverflow-hidden rounded-md shadow-md transition-all sm:min-h-[160px] md:min-h-[240px] xl:min-h-[320px]'>
			<div className='relative z-10 size-full rounded-l-md'>
				<div className='relative z-10 grid size-full place-content-center space-y-4 text-center text-accent'>
					<Typography variant='h1'>{title}</Typography>
					<Typography variant='h4'>{descr}</Typography>
				</div>

				<Image
					src={'/kromka_bunner_bg_b2b.webp'}
					alt='Kromka'
					fill
					className='absolute inset-0 select-none rounded-l-md object-cover object-center brightness-90'
					loading='lazy'
				/>
			</div>
			<div className='grid size-full place-content-center space-y-4 px-6 py-10'>
				<MailForm />
			</div>
		</section>
	)
}
