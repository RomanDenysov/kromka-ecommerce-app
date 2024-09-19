import type {CollectionConfig} from 'payload'
import {COLLECTION_SLUG} from '../config'

export const Users: CollectionConfig = {
	slug: 'users',
	admin: {
		useAsTitle: 'email',
		defaultColumns: ['email', 'role', 'createdAt'],
		listSearchableFields: ['email', 'phone'],
	},
	auth: true,
	fields: [
		{
			name: 'role',
			type: 'select',
			options: [
				{label: 'Admin', value: 'admin'},
				{label: 'User', value: 'user'},
				{label: 'Editor', value: 'editor'},
				{label: 'B2B', value: 'b2b'},
			],
			required: true,
			defaultValue: 'user',
		},
		{
			name: 'phone',
			type: 'text',
			label: 'Phone Number',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'addresses',
			type: 'array',
			label: 'Addresses',
			fields: [
				{
					name: 'address',
					type: 'relationship',
					relationTo: COLLECTION_SLUG.ADDRESSES,
					required: true,
				},
			],
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'preferences',
			type: 'group',
			label: 'User Preferences',
			fields: [
				{
					name: 'preferedStore',
					type: 'relationship',
					relationTo: COLLECTION_SLUG.STORES,
					label: 'Preferred Store',
					admin: {
						description: 'Preferred store of the user',
					},
				},
				{
					name: 'preferedPaymentMethod',
					type: 'select',
					label: 'Preferred Payment Method',
					options: [
						{label: 'Pickup in store', value: 'store'},
						{label: 'Card', value: 'card'},
					],
					admin: {
						description: 'Preferred payment method of the user',
					},
				},
			],
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'acceptedTerms',
			type: 'checkbox',
			label: 'Accepted Terms',
			required: true,
			admin: {
				position: 'sidebar',
				description: 'Accepted terms of the user',
			},
			defaultValue: false,
		},
		{
			name: 'acceptedMailNotifications',
			type: 'checkbox',
			label: 'Accepted Mail Notifications',
			admin: {
				position: 'sidebar',
				description: 'Accepted mail notifications of the user',
			},
			defaultValue: false,
		},
	],
	timestamps: true,
}
