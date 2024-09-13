import type {CollectionConfig} from 'payload'
import {COLLECTION_SLUG} from '../config'

export const Users: CollectionConfig = {
	slug: 'users',
	admin: {
		useAsTitle: 'email',
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
			name: 'address',
			type: 'relationship',
			relationTo: COLLECTION_SLUG.ADDRESSES,
			label: 'Address',
			admin: {
				position: 'sidebar',
				description: 'Address of the user',
			},
		},
		{
			name: 'preferedStore',
			type: 'relationship',
			relationTo: COLLECTION_SLUG.STORES,
			label: 'Prefered Store',
			admin: {
				position: 'sidebar',
				description: 'Prefered store of the user',
			},
		},
		{
			name: 'preferedPaymentMethod',
			type: 'select',
			label: 'Prefered Payment Method',
			options: [
				{
					label: 'Pickup in store',
					value: 'inStore',
				},
				{
					label: 'Card',
					value: 'card',
				},
				{
					label: 'Stripe',
					value: 'stripe',
				},
			],
			admin: {
				position: 'sidebar',
				description: 'Prefered payment method of the user',
			},
		},
		{
			name: 'acceptedTerms',
			type: 'checkbox',
			label: 'Accepted Terms',
			admin: {
				position: 'sidebar',
				description: 'Accepted terms of the user',
			},
		},
		{
			name: 'acceptedMailNotifications',
			type: 'checkbox',
			label: 'Accepted Mail Notifications',
			admin: {
				position: 'sidebar',
				description: 'Accepted mail notifications of the user',
			},
		},
	],
}
