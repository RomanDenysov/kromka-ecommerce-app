import {cn} from '~/shared/lib/utils'

type TypographyProps = {
	variant?:
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'span'
		| 'p'
		| 'regular'
		| 'blockquote'
		| 'code'
	children: React.ReactNode
	className?: string
}

const variantStyles = {
	h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
	h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
	h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
	h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
	h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
	h6: 'scroll-m-20 text-base font-semibold tracking-tight',
	span: 'text-base font-medium tracking-tight',
	p: 'leading-7 [&:not(:first-child)]:mt-6',
	regular: 'font-medium tracking-tight text-base',
	blockquote: 'mt-6 border-l-2 pl-6 italic',
	code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
}

export function Typography({
	variant = 'p',
	children,
	className,
}: TypographyProps) {
	const Component = variant as keyof React.JSX.IntrinsicElements
	return (
		<Component className={cn(variantStyles[variant], className)}>
			{children}
		</Component>
	)
}
