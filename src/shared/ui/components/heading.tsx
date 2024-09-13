import {cn} from '~/shared/lib/utils'
import {Typography} from './typography'

type Props = {
	title?: string
	subtitle?: string
	className?: string
}

export const Heading = ({title, subtitle, className}: Props) => {
	if (!title) return null
	return (
		<div className={cn('', className)}>
			<Typography variant='h3' key={`heading-${title}`}>
				{title}
			</Typography>
			{subtitle && (
				<Typography variant='span' key={`subtitle-${subtitle}`}>
					{subtitle}
				</Typography>
			)}
		</div>
	)
}
