import type {StaticImport} from 'next/dist/shared/lib/get-img-props'

export type Item = {
	title: string
	descr?: string
	img: string | StaticImport
	href: string
}
