'use client'

import {AlignJustifyIcon} from 'lucide-react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useRouter} from 'next/navigation'
import React from 'react'
import {useMedia, useMountedState, useWindowScroll} from 'react-use'
import {NAV_LINKS} from '~/shared/config/navigation'
import {cn} from '~/shared/lib/utils'
import {Button, buttonVariants} from '~/shared/ui/components/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '~/shared/ui/components/sheet'
import {Icons} from '~/shared/ui/icons'

export const Navbar = React.memo(() => {
	const isMounted = useMountedState()
	const pathname = usePathname()
	const router = useRouter()
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const isHome = pathname === '/'
	const isMobile = useMedia('(max-width: 768px)', false)
	const {y} = useWindowScroll()

	const showNavbar = isHome ? y > 200 : true

	const isActive = (href: string) => {
		if (href === '/') return pathname === '/'
		return pathname.startsWith(href)
	}

	const onClick = (href: string) => {
		router.push(href)
		setIsOpen(false)
	}

	if (!isMounted) return null

	if (isMobile) {
		return (
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button variant={'ghost'} size={'icon'} className='rounded-full'>
						<AlignJustifyIcon size={32} />
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='px-4'>
					<SheetHeader className='grid w-full place-content-center'>
						<SheetTitle>
							<Icons.kromka className='h-4 w-auto fill-accent-foreground' />
							<span className='sr-only'>Kromka Logo</span>
						</SheetTitle>
						<SheetDescription hidden>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
						</SheetDescription>
					</SheetHeader>
					<nav className='flex flex-col gap-y-4 py-10'>
						{NAV_LINKS.map((link) => (
							<Button
								onClick={() => onClick(link.href)}
								key={link.href}
								variant={'ghost'}
								className={cn(
									'w-full justify-start text-lg tracking-tight',
									link.href === pathname && 'bg-accent text-accent-foreground',
								)}>
								<link.icon size={20} className='mr-2 text-muted-foreground' />
								{link.label}
							</Button>
						))}
					</nav>
				</SheetContent>
			</Sheet>
		)
	}
	return (
		<>
			{showNavbar && (
				<div className='hidden items-center justify-start gap-x-1 md:inline-flex lg:gap-x-2'>
					{NAV_LINKS.map(({href, label}) => (
						<Link
							key={href}
							className={cn(
								buttonVariants({variant: 'link'}),
								'px-2 text-primary',
								isActive(href) && 'text-accent-foreground underline',
								isHome && href === '/' && 'hidden',
							)}
							aria-current={isActive(href) ? 'page' : undefined}
							href={href}>
							{label}
						</Link>
					))}
				</div>
			)}
		</>
	)
})
