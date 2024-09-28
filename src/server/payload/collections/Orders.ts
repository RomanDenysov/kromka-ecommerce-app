import type {CollectionConfig} from 'payload'
import {isAdmin, isAdminOrCreatedBy} from '~/server/payload/access'
import {COLLECTION_SLUG} from '~/server/payload/config'

export const Orders: CollectionConfig = {
	slug: COLLECTION_SLUG.ORDERS,
	admin: {
		useAsTitle: 'status',
		defaultColumns: ['name', 'status', 'createdBy'],
	},
	access: {
		read: isAdminOrCreatedBy,
		create: () => true,
		update: isAdmin,
		delete: () => false,
	},
	hooks: {
		beforeChange: [
			async ({req, operation, data}) => {
				if (operation === 'create' && data) {
					if (req.user) {
						data.createdBy = req.user.id
					}
					return data
				}
			},
		],
		beforeValidate: [
			async ({data, operation}) => {
				if ((operation === 'create' || operation === 'update') && data) {
					const isAuthenticatedOrder = Boolean(data.createdBy)
					const hasGuestInfo =
						data.guestInfo?.name &&
						data.guestInfo?.email &&
						data.guestInfo?.phone

					if (!isAuthenticatedOrder && !hasGuestInfo) {
						throw new Error(
							'Either a registered user must be associated with the order, or guest information must be provided.',
						)
					}
				}
			},
		],
	},
	fields: [
		{
			name: 'createdBy',
			type: 'relationship',
			relationTo: COLLECTION_SLUG.USERS,
			label: 'Customer',
			hasMany: false,
			access: {
				update: () => false,
			},
			admin: {
				position: 'sidebar',
				readOnly: true,
				condition: (data) => Boolean(data.createdBy),
			},
		},
		{
			name: 'guestInfo',
			type: 'group',
			label: 'Guest Customer Information',
			admin: {
				condition: (data) => data.createdBy,
			},
			fields: [
				{
					name: 'name',
					type: 'text',
					label: 'Name',
					required: true,
				},
				{
					name: 'email',
					type: 'email',
					label: 'Email',
					required: true,
				},
				{
					name: 'phone',
					type: 'text',
					label: 'Phone',
					required: true,
				},
			],
		},
		{
			name: 'status',
			type: 'select',
			label: 'Order Status',
			required: true,
			options: [
				{
					label: 'Pending',
					value: 'pending',
				},
				{
					label: 'In progress',
					value: 'progress',
				},
				{
					label: 'Ready for pickup/delivery',
					value: 'ready',
				},
				{
					label: 'Completed',
					value: 'completed',
				},
				{
					label: 'Cancelled',
					value: 'cancelled',
				},
			],
			admin: {
				position: 'sidebar',
				description:
					"Pending - the order hasn't been processed yet (default). In progress - the order is being processed. Ready for pickup/delivery - the order is ready for pickup/delivery. Shipped - the order has been shipped. Completed - the order has been completed. Cancelled - the order has been cancelled.",
			},
			defaultValue: 'pending',
		},
		{
			name: 'paymentMethod',
			type: 'select',
			label: 'Payment Method',
			required: true,
			options: [
				{
					label: 'Pickup in store (cash or card)',
					value: 'inStore',
				},
				{
					label: 'Card',
					value: 'card',
				},
				{
					label: 'B2B (optional now)',
					value: 'b2b',
				},
				{
					label: 'Other',
					value: 'other',
				},
			],
		},
		{
			name: 'paymentStatus',
			type: 'select',
			label: 'Payment Status',
			required: true,
			options: [
				{
					label: 'Pending',
					value: 'pending',
				},
				{
					label: 'In progress',
					value: 'progress',
				},
				{
					label: 'Completed',
					value: 'completed',
				},
				{
					label: 'Cancelled',
					value: 'cancelled',
				},
			],
			defaultValue: 'pending',
		},
		{
			name: '_isPaid',
			type: 'checkbox',
			required: true,
			access: {
				read: ({req}) => req?.user?.role === 'admin',
				create: () => false,
				update: () => false,
			},
			admin: {
				hidden: true,
			},
		},
		{
			name: 'products',
			type: 'array',
			fields: [
				{
					name: 'product',
					type: 'relationship',
					relationTo: COLLECTION_SLUG.PRODUCTS,
					label: 'Product',
					required: true,
				},
				{
					name: 'quantity',
					type: 'number',
					label: 'Quantity',
					required: true,
					min: 1,
				},
			],
		},
		{
			name: 'subtotal',
			type: 'number',
			label: 'Subtotal',
			min: 0,
			max: 10000,
			admin: {
				position: 'sidebar',
				readOnly: true,
			},
		},
		{
			name: 'discount',
			type: 'number',
			label: 'Discount',
			min: 0,
			max: 10,
			defaultValue: 0,
			admin: {
				position: 'sidebar',
				description: 'Discount of the order',
			},
		},
		{
			name: 'totalPrice',
			type: 'number',
			label: 'Total Price',
			required: true,
			min: 0,
			max: 10000,
			admin: {
				position: 'sidebar',
				description: 'Total price of the order after discount',
				readOnly: true,
			},
		},
		{
			name: 'pickupStore',
			type: 'relationship',
			relationTo: COLLECTION_SLUG.STORES,
			label: 'Pickup Store',
			required: true,
			hasMany: false,
			admin: {
				position: 'sidebar',
				description: 'Pickup store of the order',
				condition: (data) => data.deliveryMethod === 'pickup',
			},
		},
		{
			name: 'pickupDate',
			type: 'date',
			label: 'Pickup Date',
			admin: {
				position: 'sidebar',
				description: 'Pickup date for the order',
				condition: (data) => data.deliveryMethod === 'pickup',
			},
		},
		{
			name: 'notes',
			type: 'textarea',
			label: 'Notes',
			admin: {
				description:
					'Internal notes for the admins and store managers, sellers',
			},
		},
	],
	timestamps: true,
}
