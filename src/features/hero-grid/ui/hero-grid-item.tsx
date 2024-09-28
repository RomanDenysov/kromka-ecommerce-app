import Image from 'next/image'
import {Typography} from '~/shared/ui/components/typography'
import type {Item} from '../types'

export const HeroGridItem = ({title, descr, img, href}: Item) => {
	return (
		<div className='group relative grid aspect-auto min-h-[180px] w-full place-content-center overflow-hidden rounded-md p-4 shadow-md transition-all sm:min-h-[240px] md:min-h-[320px] md:p-10 xl:min-h-[400px]'>
			<div className='z-10 size-full space-y-2 text-center text-accent/95 md:space-y-4'>
				<Typography variant='h1'>{title}</Typography>
				<Typography variant='h4'>{descr} &rarr;</Typography>
			</div>

			<Image
				src={img}
				alt='Kromka'
				fill
				className='absolute inset-0 object-cover object-center brightness-90 transition-all group-hover:scale-105'
				loading='lazy'
			/>
		</div>
	)
}
