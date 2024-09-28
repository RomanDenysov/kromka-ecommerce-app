import Image from 'next/image'
import Link from 'next/link'
import {Typography} from '~/shared/ui/components/typography'

export default function AboutCard() {
	const title = 'O nás'
	const descr = 'Lorem ipsum dolor sit amet'

	return (
		<section className='group relative grid aspect-auto min-h-[220px] w-full place-content-center overflow-hidden rounded-md p-4 shadow-md transition-all sm:min-h-[260px] md:min-h-[340px] md:p-10 xl:min-h-[420px]'>
			<Link href={'/about'} className='size-full'>
				<div className='relative z-10 size-full space-y-4 text-center text-accent/95'>
					<Typography variant='h1'>{title}</Typography>
					<Typography variant='h4'>{descr} &rarr;</Typography>
				</div>

				<Image
					src={'/kromka_bunner_bg_b2b.webp'}
					alt='Kromka'
					fill
					className='absolute inset-0 object-cover object-center brightness-90 transition-all group-hover:scale-105'
					loading='lazy'
				/>
			</Link>
		</section>
	)
}
