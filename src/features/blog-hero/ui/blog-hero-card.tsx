import {AspectRatio} from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'
import Link from 'next/link'
import {Typography} from '~/shared/ui/components/typography'

export default function BlogHeroCard() {
	const title = 'Posledny pridany post'
	const descr = 'Lorem ipsum dolor sit amet'

	return (
		<section>
			<AspectRatio
				ratio={16 / 9}
				className='group relative size-full overflow-hidden rounded-md bg-muted p-4 shadow-md transition-all md:p-10'>
				<div className='absolute inset-x-0 bottom-0 z-10 flex size-full h-fit items-start justify-between space-y-2 bg-background px-4 pt-2 pb-4 text-center text-primary/95 transition-all group-hover:bg-background/80'>
					<div className='flex flex-col items-start justify-start gap-y-0.5'>
						<Typography variant='p'>info tag</Typography>
						<Link
							href={'/about'}
							className='text-primary hover:underline group-hover:underline'>
							<Typography variant='h4'>{title}</Typography>
						</Link>
						<Typography variant='span'>{descr} &rarr;</Typography>
					</div>
					<div>
						<Typography variant='span'>Data a čas</Typography>
						<Typography variant='span'>Data a čas</Typography>
					</div>
				</div>

				<Image
					src={'/kromka_bunner_bg_b2b.webp'}
					alt='Kromka'
					fill
					className='absolute inset-0 object-cover object-center transition-all'
					loading='lazy'
				/>
			</AspectRatio>
		</section>
	)
}
