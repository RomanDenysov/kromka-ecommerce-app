'use client'
import {Button} from '~/shared/ui/components/button'
import {ScrollArea, ScrollBar} from '~/shared/ui/components/scroll-area'
import {Skeleton} from '~/shared/ui/components/skeleton'
import {useCategoriesQuery} from '../hooks/use-categories-query'

export default function ProductFilters() {
	const {data: categories, isLoading} = useCategoriesQuery()

	if (isLoading) return <ProductFiltersPlaceholder />

	if (!categories || categories.length === 0) return null

	return (
		<div className='sticky top-16 mb-2'>
			<ScrollArea className='w-full whitespace-nowrap'>
				<div className='flex flex-wrap gap-2'>
					{categories.map((category) => (
						<Button
							key={category.id}
							variant={'ghost'}
							className='px-2 py-1 font-medium text-sm tracking-tight '>
							{category.name}
						</Button>
					))}
				</div>
				<ScrollBar orientation='horizontal' />
			</ScrollArea>
		</div>
	)
}

const ProductFiltersPlaceholder = () => {
	return (
		<div className='sticky top-16 mb-2'>
			<div className='flex gap-x-2 p-1'>
				<Skeleton className='h-6 w-20 rounded-md' />
				<Skeleton className='h-6 w-20 rounded-md' />
				<Skeleton className='h-6 w-20 rounded-md' />
			</div>
		</div>
	)
}