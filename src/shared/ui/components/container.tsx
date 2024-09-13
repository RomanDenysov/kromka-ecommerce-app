import {cn} from '~/shared/lib/utils'

type Props = {
	className?: string
	children: React.ReactNode
}

export default function Container({children, className}: Props) {
	return (
		<div className={cn('container mx-auto w-full px-4 md:px-10', className)}>
			{children}
		</div>
	)
}
