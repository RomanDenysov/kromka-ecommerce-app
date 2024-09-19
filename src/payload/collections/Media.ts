import path from 'node:path'
import {fileURLToPath} from 'node:url'
import type {CollectionConfig} from 'payload'
import {isAdmin} from '~/payload/access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
	slug: 'media',
	access: {
		read: () => true,
		create: isAdmin,
		update: isAdmin,
		delete: isAdmin,
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			required: true,
			admin: {
				description:
					'Describes the image for screen readers and search engines. e.g. "A picture of a croissant"',
				placeholder: 'A picture of a croissant',
			},
		},
	],
	upload: {
		imageSizes: [
			{
				name: 'sm',
				width: 320,
				height: 240,
				position: 'centre',
			},
			{
				name: 'thumbnail',
				width: 480,
				height: 320,
				position: 'centre',
			},
			{
				name: 'md',
				width: 640,
				height: 480,
				position: 'centre',
			},
			{
				name: 'lg',
				width: 1024,
				height: undefined,
				position: 'centre',
			},
		],
		staticDir: path.resolve(dirname, '../../../public/media'),
		mimeTypes: [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/svg+xml',
			'image/webp',
		],
	},
}
