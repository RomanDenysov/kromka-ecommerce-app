import {LinkIcon} from 'lucide-react'
import Link from 'next/link'

export default function B2bPage() {
	return (
		<center className='grid min-h-screen place-content-center text-center font-bold text-3xl'>
			<h1>Tu treba pridat VELKU KRASNU FOTKU, bude podobne na:</h1>
			<Link
				href='/auth'
				className='mt-5 flex w-full items-center justify-center underline'>
				TOTO TU
				<LinkIcon className='ml-2 size-10' />
			</Link>
		</center>
	)
}
