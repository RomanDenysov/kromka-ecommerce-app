import {Skeleton} from '~/shared/ui/components/skeleton'

type ProductSkeletonProps = {
	count?: number
}

export default function ProductsReelSkeleton({
	count = 4,
}: ProductSkeletonProps) {
	return (
		<div className='grid size-full grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
			{Array.from({length: count}).map(() => (
				<div
					key={`skeleton-${count}`}
					className='relative flex aspect-square w-full flex-col'>
					<div className='relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100'>
						<Skeleton className='h-full w-full' />
					</div>
					<Skeleton className='mt-4 h-4 w-2/3 rounded-lg' />
					<Skeleton className='mt-2 h-4 w-16 rounded-lg' />
					<Skeleton className='mt-2 h-4 w-12 rounded-lg' />
				</div>
			))}
		</div>
	)
}
