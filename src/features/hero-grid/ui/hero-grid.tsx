import Link from 'next/link'
import React from 'react'
import {cn} from '~/shared/lib/utils'
import type {Item} from '../types'
import {HeroGridItem} from './hero-grid-item'

const GRID_NAV_ITEMS = [
	{
		title: 'Nakupovať naše produkty',
		descr: 'Lorem ipsum dolor sit amet',
		img: '/kromka_bunner_bg_b2b.webp',
		href: '/products',
	},
	{
		title: 'Naš blog',
		descr: 'Lorem ipsum dolor sit amet',
		img: '/kromka_bunner_bg_b2b.webp',
		href: '/blog',
	},
	{
		title: 'Stan partnerom',
		descr: 'Lorem ipsum dolor sit amet',
		img: '/kromka_bunner_bg_b2b.webp',
		href: '/b2b',
	},
]

// TODO: make mandatory items props
type Props = {
	className?: string
	items?: Item[]
}

const HeroGrid = React.memo(({className, items}: Props) => {
	return (
		<div
			className={cn(
				'grid size-full content-stretch gap-6 md:grid-cols-3',
				className,
			)}>
			{GRID_NAV_ITEMS.map((item, index) => (
				<Link
					key={item.title}
					href={item.href}
					className={cn(
						'col-span-1 size-full',
						index === 0 && 'md:col-span-3',
						index === 2 && 'md:col-span-2',
					)}>
					<HeroGridItem {...item} />
				</Link>
			))}
		</div>
	)
})

export default HeroGrid
