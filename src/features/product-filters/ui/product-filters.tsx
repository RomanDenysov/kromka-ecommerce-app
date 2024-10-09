'use client'

import {ChevronRightIcon} from 'lucide-react'
import {useRouter, useSearchParams} from 'next/navigation'
import React from 'react'
import {useDebounce} from 'react-use'
import {cn} from '~/shared/lib/utils'
import {Button} from '~/shared/ui/components/button'
import Container from '~/shared/ui/components/container'
import {ScrollArea, ScrollBar} from '~/shared/ui/components/scroll-area'
import {Skeleton} from '~/shared/ui/components/skeleton'
import {api} from '~/trpc/react'

export default function ProductFilters() {
	const {data: categories, isLoading} = api.categories.getAll.useQuery()
	const searchParams = useSearchParams()
	const router = useRouter()
	const [currentCategory, setCurrentCategory] = React.useState(
		searchParams.get('c'),
	)

	useDebounce(
		() => {
			if (currentCategory) {
				router.push(`?c=${currentCategory}`, {scroll: false})
			} else {
				router.push('/products', {scroll: false})
			}
		},
		500,
		[currentCategory, router],
	)

	if (isLoading) return <ProductFiltersPlaceholder />
	if (!categories || categories.length === 0) return null

	return (
		<div className='sticky inset-x-0 top-16 z-40 mb-2 bg-background'>
			<Container>
				<ScrollArea className='relative w-full whitespace-nowrap'>
					<div className='flex flex-nowrap gap-2 pt-1 pb-2'>
						<Button
							variant={'ghost'}
							aria-label='Category: Všetky produkty'
							aria-current={'page'}
							className={cn(
								'h-7 px-2 py-0 font-medium text-sm tracking-tight',
								currentCategory === null
									? 'bg-accent text-accent-foreground'
									: 'hover:bg-accent/80',
							)}
							onClick={() => setCurrentCategory(null)}>
							Všetky produkty
						</Button>
						{categories.map((category) => (
							<Button
								key={category.slug}
								variant={'ghost'}
								aria-label={`Category: ${category.name}`}
								aria-current={
									currentCategory === category.slug ? 'page' : undefined
								}
								className={cn(
									'h-7 px-2 py-0 font-medium text-sm tracking-tight',
									currentCategory === category.slug
										? 'bg-accent text-accent-foreground'
										: 'hover:bg-accent/80',
								)}
								// biome-ignore lint/style/noNonNullAssertion: <explanation>
								onClick={() => setCurrentCategory(category?.slug!)}>
								{category.name}
							</Button>
						))}
					</div>
					<ScrollBar orientation='horizontal' />
					<Button
						onClick={() => {}}
						variant={'ghost'}
						size={'icon'}
						className='absolute top-0 right-0'>
						<ChevronRightIcon size={20} />
					</Button>
				</ScrollArea>
			</Container>
		</div>
	)
}

const ProductFiltersPlaceholder = () => {
	return (
		<div className='sticky inset-x-0 top-16 z-40 mb-2 bg-background'>
			<Container>
				<div className='flex gap-x-2 pt-1 pb-2'>
					<Skeleton className='h-6 w-20 rounded-md' />
					<Skeleton className='h-6 w-20 rounded-md' />
					<Skeleton className='h-6 w-20 rounded-md' />
				</div>
			</Container>
		</div>
	)
}
