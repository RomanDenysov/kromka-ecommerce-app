'use client'
import {HelpCircleIcon} from 'lucide-react'
import React from 'react'
import {useMedia} from 'react-use'
import {cn} from '~/shared/lib/utils'
import {Alert, AlertDescription, AlertTitle} from './alert'
import {Tooltip, TooltipContent, TooltipTrigger} from './tooltip'
import {Typography} from './typography'

type Props = {
	title: string
	description: string
	className?: string
}

export const InfoBlock = ({title, description, className}: Props) => {
	const isMobile = useMedia('(max-width: 768px)', false)

	return (
		<React.Fragment>
			{isMobile ? (
				<Alert className='bg-accent p-2'>
					<AlertTitle className='text-muted-foreground tracking-tight'>
						{title}
					</AlertTitle>
					<AlertDescription className='text-muted-foreground text-sm tracking-tight'>
						{description}
					</AlertDescription>
				</Alert>
			) : (
				<div className={cn('flex items-center', className)}>
					<Typography variant='h6' className='text-muted-foreground'>
						{title}
					</Typography>
					<Tooltip>
						<TooltipTrigger>
							<HelpCircleIcon
								size={20}
								className='ml-2 text-muted-foreground'
							/>
						</TooltipTrigger>
						<TooltipContent className='rounded-md bg-background p-2 text-muted-foreground shadow-sm'>
							<Typography variant='p' className='text-muted-foreground text-sm'>
								{description}
							</Typography>
						</TooltipContent>
					</Tooltip>
				</div>
			)}
		</React.Fragment>
	)
}
