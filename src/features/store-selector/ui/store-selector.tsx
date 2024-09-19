'use client'

import {CheckIcon, ChevronsUpDown, StoreIcon} from 'lucide-react'
import React from 'react'
import {cn} from '~/shared/lib/utils'
import {Button} from '~/shared/ui/components/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '~/shared/ui/components/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '~/shared/ui/components/popover'
import {Skeleton} from '~/shared/ui/components/skeleton'
import useStoreQuery from '../hooks/use-stores-query'

type Props = {
	width?: string
}

export default function StoreSelector({width}: Props) {
	const {data: stores, isLoading} = useStoreQuery()
	const [open, setOpen] = React.useState<boolean>(false)
	const [value, setValue] = React.useState<string | null>(null)

	const handleSelect = (slug: string) => {
		setValue(slug)
		setOpen(false)
	}

	if (isLoading || !stores) return <StoreSelectorPlaceholder />

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					size={'sm'}
					role='combobox'
					aria-expanded={open}
					aria-haspopup='listbox'
					aria-label='Store selector'
					variant={'outline'}
					className={cn('w-[200px] items-center justify-between', width)}>
					<StoreIcon size={20} className='mr-2 text-muted-foreground' />
					{value || 'Vyberte si Vaš obchod...'}
					<ChevronsUpDown size={16} className='ml-auto shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={cn('w-[200px] p-0 text-sm tracking-tight', width)}>
				<Command>
					<CommandInput placeholder='Hladaj...' />
					<CommandList>
						<CommandEmpty>
							Nenašli sa nič vyhovujúceho vášmu hľadaní.
						</CommandEmpty>
						<CommandGroup heading='Naše obchody'>
							{stores.map((store) => (
								<CommandItem
									key={store.slug}
									className='text-sm tracking-tight'
									onSelect={handleSelect}
									value={store.name}>
									<StoreIcon size={16} className='mr-2 text-muted-foreground' />
									{store.name}
									<CheckIcon
										size={16}
										className={cn(
											'ml-auto text-muted-foreground',
											value === store.name ? 'opacity-100' : 'opacity-0',
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

const StoreSelectorPlaceholder = ({width}: Props) => {
	return (
		<Skeleton
			className={cn(
				'flex h-8 w-[200px] items-center justify-between rounded-md px-3 py-2',
				width,
			)}>
			<Skeleton className='h-4 w-4 rounded-md bg-primary/20' />
			<Skeleton className='h-4 w-2/3 rounded-md bg-primary/20' />
			<Skeleton className='h-4 w-4 rounded-md bg-primary/20' />
		</Skeleton>
	)
}
