import type {CollectionConfig} from 'payload'
import {isAdmin} from '~/server/payload/access'
import {COLLECTION_SLUG} from '~/server/payload/config'

export const Addresses: CollectionConfig = {
	slug: COLLECTION_SLUG.ADDRESSES,
	admin: {
		useAsTitle: 'street',
		defaultColumns: ['street', 'city', 'zip', 'country'],
	},
	access: {
		read: () => true,
		create: () => true,
		update: isAdmin,
		delete: isAdmin,
	},
	fields: [
		{
			name: 'street',
			type: 'text',
			label: 'Street',
			required: true,
		},
		{
			name: 'street2',
			type: 'text',
			label: 'Street 2 (optional)',
		},
		{
			name: 'city',
			type: 'text',
			label: 'City',
			required: true,
		},
		{
			name: 'zip',
			type: 'text',
			label: 'Zip Code',
			required: true,
		},
		{
			name: 'country',
			type: 'text',
			label: 'Country',
			required: true,
			defaultValue: 'Slovakia',
		},
		{
			name: 'googleMapsUrl',
			type: 'text',
			label: 'Google Maps URL',
			index: true,
		},
	],
	timestamps: false,
}
