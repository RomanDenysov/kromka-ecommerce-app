'use client'
import {Button} from '~/shared/ui/components/button'
import Container from '~/shared/ui/components/container'
import {ScrollArea, ScrollBar} from '~/shared/ui/components/scroll-area'
import {Skeleton} from '~/shared/ui/components/skeleton'
import {api} from '~/trpc/react'

export default function ProductFilters() {
	const {data: categories, isLoading} = api.categories.getAll.useQuery()
	if (isLoading) return <ProductFiltersPlaceholder />
	if (!categories || categories.length === 0) return null

	return (
		<div className='sticky inset-x-0 top-16 z-40 mb-2 bg-background'>
			<Container>
				<ScrollArea className='w-full whitespace-nowrap'>
					<div className='flex flex-wrap gap-2 py-1'>
						{categories.map((category) => (
							<Button
								key={category.slug}
								variant={'ghost'}
								className='h-7 px-2 py-0 font-medium text-sm tracking-tight '>
								{category.name}
							</Button>
						))}
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</Container>
		</div>
	)
}

const ProductFiltersPlaceholder = () => {
	return (
		<div className='sticky inset-x-0 top-16 z-40 mb-2 bg-background'>
			<Container>
				<div className='flex gap-x-2 p-1'>
					<Skeleton className='h-6 w-20 rounded-md' />
					<Skeleton className='h-6 w-20 rounded-md' />
					<Skeleton className='h-6 w-20 rounded-md' />
				</div>
			</Container>
		</div>
	)
}
