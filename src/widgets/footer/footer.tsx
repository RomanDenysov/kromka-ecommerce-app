import Link from 'next/link'
import StoreCard from '~/features/store-selector/ui/store-card'
import Container from '~/shared/ui/components/container'
import {Typography} from '~/shared/ui/components/typography'
import {Icons} from '~/shared/ui/icons'
import {FooterContacts} from './footer-contacts'
import {FooterNav} from './footer-nav'
import {SocialLinks} from './social-links'

export default function Footer() {
	return (
		<footer className='mx-auto bg-muted'>
			<Container>
				<div className='size-full border-border border-t py-10'>
					<div className='grid place-content-center'>
						<Icons.logo className='size-10 fill-accent-foreground md:size-12' />
					</div>
				</div>
				<div className='grid grid-cols-2 place-items-center items-start gap-x-6 gap-y-10 md:grid-cols-4'>
					<div className='hidden md:block'>
						<FooterNav />
					</div>
					<div className='h-full space-y-2'>
						<span className='mb-4 ml-4 font-medium text-base text-primary tracking-tight'>
							Socialne siete
						</span>
						<SocialLinks />
					</div>
					<div className='h-full space-y-2'>
						<span className='mb-4 ml-4 font-medium text-base text-primary tracking-tight'>
							Kontakty
						</span>
						<FooterContacts />
					</div>
					<div className='col-span-2 md:col-span-1'>
						<StoreCard />
					</div>
				</div>
			</Container>
			<div className='flex size-full flex-col-reverse items-center justify-between space-y-2 px-4 pt-10 pb-4 md:flex-row md:px-10'>
				<div className='w-full self-center md:self-start'>
					<Typography
						variant='p'
						className='text-muted-foreground text-xs md:text-sm'>
						&copy; {new Date().getFullYear()} Všetky práva vyhradené pre Kavejo
						s.r.o.
					</Typography>
				</div>

				<div className='w-full self-center md:self-end'>
					<div className='flex flex-col items-center justify-end space-x-4 space-y-1 md:flex-row'>
						<Link
							href='/obchodne-podmienky'
							className='text-center text-muted-foreground text-xs tracking-tight hover:text-gray-600 hover:underline md:text-sm'>
							Obchodné podmienky
						</Link>
						<Link
							href='/ochrana-osobnych-udajov'
							className='text-center text-muted-foreground text-xs tracking-tight hover:text-gray-600 hover:underline md:text-sm'>
							Ochrana osobných údajov
						</Link>
						<Link
							href='/cookie-policy'
							className='text-center text-muted-foreground text-xs tracking-tight hover:text-gray-600 hover:underline md:text-sm'>
							Cookie Policy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
