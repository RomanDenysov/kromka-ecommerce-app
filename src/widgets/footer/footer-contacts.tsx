'use client'
import {MailIcon, PhoneIcon} from 'lucide-react'
import Link from 'next/link'
import {cn} from '~/shared/lib/utils'
import {buttonVariants} from '~/shared/ui/components/button'

const FOOTER_CONTACTS = [
	{
		href: 'mailto:info@pekarenkromka.sk',
		icon: MailIcon,
		label: 'Nas mail',
	},
	{
		href: 'tel:+42077777777',
		icon: PhoneIcon,
		label: 'Nas telefon',
	},
]

export const FooterContacts = () => {
	return (
		<div className='flex flex-col items-start justify-start space-y-1'>
			{FOOTER_CONTACTS.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className={cn(
						buttonVariants({variant: 'ghost'}),
						'text-muted-foreground hover:text-accent-foreground',
					)}>
					<link.icon className='mr-2 size-5' />
					{link.label}
				</Link>
			))}
		</div>
	)
}
