import type {CollectionConfig} from 'payload'
import {COLLECTION_SLUG} from '~/server/payload/config'

export const Tags: CollectionConfig = {
	slug: COLLECTION_SLUG.TAGS,
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name'],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			label: 'Tag Name',
			unique: true,
			required: true,
		},
	],
}
