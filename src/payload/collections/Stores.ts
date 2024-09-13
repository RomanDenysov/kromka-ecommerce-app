import type {CollectionConfig} from 'payload'
import {COLLECTION_SLUG} from '~/payload/config'
import slugField from '~/payload/fields/slug'

export const Stores: CollectionConfig = {
	slug: COLLECTION_SLUG.STORES,
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'city', 'phone'],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			label: 'Store Name',
			required: true,
		},
		{
			name: 'openHours',
			type: 'group',
			label: 'Open Hours',
			admin: {
				description: 'Open hours of the store',
			},
			fields: [
				{
					name: 'mondayFriday',
					label: 'Monday to Friday',
					type: 'text',
					admin: {
						description: 'E.g. 8:00 - 18:00',
					},
				},
				{
					name: 'saturday',
					label: 'Saturday',
					type: 'text',
				},
				{
					name: 'sunday',
					label: 'Sunday',
					type: 'text',
				},
			],
		},
		{
			name: 'phone',
			type: 'text',
			label: 'Phone Number',
			required: true,
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'email',
			type: 'email',
			label: 'Email',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'address',
			type: 'relationship',
			relationTo: COLLECTION_SLUG.ADDRESSES,
			label: 'Address',
			required: true,
			hasMany: false,
		},
		{
			name: 'isActive',
			type: 'checkbox',
			label: 'Is Active',
			defaultValue: true,
			admin: {
				position: 'sidebar',
				description: 'Uncheck to temporarily disable this store',
			},
		},
		slugField('name'),
	],
	hooks: {
		afterRead: [
			async ({doc, req}) => {
				if (doc.address) {
					const populatedAddress = await req.payload.findByID({
						collection: COLLECTION_SLUG.ADDRESSES,
						id: doc.address,
					})
					doc.address = populatedAddress
				}
				return doc
			},
		],
	},
}
