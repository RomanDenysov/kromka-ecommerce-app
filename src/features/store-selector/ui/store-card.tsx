import {MailIcon, MapPinIcon, PhoneIcon} from 'lucide-react'
import Link from 'next/link'
import {Separator} from '~/shared/ui/components/separator'
import {Typography} from '~/shared/ui/components/typography'
import StoreSelector from './store-selector'

export default function StoreCard() {
	return (
		<div className='flex w-fit flex-col items-center justify-between space-y-2 rounded-md bg-background/60 p-2 shadow-sm'>
			<StoreSelector />
			<div className='size-full space-y-2 rounded-md bg-background px-4 py-2 shadow-sm'>
				<div className='flex flex-col space-y-2'>
					<Typography variant='span' className='text-muted-foreground'>
						Otváracie hodiny
					</Typography>
					<Separator />
					<div className='flex flex-col space-y-1'>
						<span className='overflow-hidden text-nowrap text-xs tracking-tight lg:text-sm xl:text-base'>
							Po-Pia: 8:00 - 18:00
						</span>
						<span className='overflow-hidden text-nowrap text-xs tracking-tight lg:text-sm xl:text-base'>
							Sobota: 8:00 - 18:00
						</span>
						<span className='overflow-hidden text-nowrap text-xs tracking-tight lg:text-sm xl:text-base'>
							Nedeľa: Zatvorene
						</span>
					</div>
					<Separator />
				</div>
				<div className='flex w-full items-center justify-center space-x-5 md:space-x-8'>
					<Link href={''}>
						<PhoneIcon size={16} />
					</Link>
					<Link href={''}>
						<MailIcon size={16} />
					</Link>
					<Link href={''}>
						<MapPinIcon size={16} />
					</Link>
				</div>
			</div>
		</div>
	)
}
