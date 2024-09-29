import type {CollectionConfig} from 'payload'
import {isAdmin} from '../access'
import {COLLECTION_SLUG} from '../config'

export const Inventory: CollectionConfig = {
	slug: COLLECTION_SLUG.INVENTORY,
	admin: {
		useAsTitle: 'product',
		defaultColumns: ['product', 'store', 'quantity'],
	},
	access: {
		read: () => true,
		create: isAdmin,
		update: isAdmin,
		delete: isAdmin,
	},
	fields: [
		{
			name: 'product',
			type: 'relationship',
			relationTo: COLLECTION_SLUG.PRODUCTS,
			label: 'Product',
			required: true,
			hasMany: false,
		},
		{
			name: 'store',
			type: 'relationship',
			relationTo: COLLECTION_SLUG.STORES,
			label: 'Store',
			required: true,
			hasMany: false,
		},
		{
			name: 'quantity',
			type: 'number',
			label: 'Quantity',
			required: true,
			min: 0,
			admin: {
				position: 'sidebar',
				step: 1,
			},
		},
		{
			name: 'date',
			type: 'date',
			label: 'Date',
			required: true,
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'status',
			type: 'select',
			label: 'Status',
			options: [
				{label: 'Available', value: 'available'},
				{label: 'Unavailable', value: 'unavailable'},
			],
		},
	],
}
