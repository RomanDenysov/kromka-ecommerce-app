import type {CollectionConfig} from 'payload'
import {isAdmin} from '~/server/payload/access'
import {COLLECTION_SLUG} from '~/server/payload/config'
import slugField from '~/server/payload/fields/slug'
import {stripe} from '~/shared/lib/stripe/stripe'

export const Products: CollectionConfig = {
	slug: COLLECTION_SLUG.PRODUCTS,
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'category', 'price'],
	},
	access: {
		read: () => true,
		create: isAdmin,
		update: isAdmin,
		delete: () => false,
	},
	hooks: {
		beforeChange: [
			async ({req, operation, data}) => {
				if (req.user && operation === 'create') {
					data.createdBy = req.user.id
				}
				try {
					if (operation === 'create') {
						const createdProduct = await stripe.products.create({
							name: data.name,
							default_price_data: {
								currency: 'eur',
								unit_amount: Math.round(data.price * 100),
							},
						})
						data.stripeId = createdProduct.id
						data.priceId = createdProduct.default_price as string
					}
					if (operation === 'update' && data.stripeId) {
						const newPrice = await stripe.prices.create({
							product: data.stripeId,
							currency: 'eur',
							unit_amount: Math.round(data.price * 100),
						})
						await stripe.products.update(data.stripeId, {
							name: data.name,
							default_price: newPrice.id,
						})
						data.priceId = newPrice.id
					}
				} catch (error) {
					console.error('[PRODUCTS HOOKS]:', error)
				}
				return data
			},
		],
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
			admin: {
				description: 'Name of the product',
				placeholder: 'Product name',
			},
		},
		{
			name: 'description',
			type: 'textarea',
			required: true,
			admin: {
				description: 'Product description',
			},
		},
		{
			name: 'composition',
			type: 'textarea',
			admin: {
				description:
					'Product composition or any useful information about the product',
			},
		},
		{
			name: 'price',
			type: 'number',
			label: 'Price (EUR)',
			required: true,
			min: 0,
			max: 100,
			admin: {
				step: 0.01,
				position: 'sidebar',
			},
		},

		{
			name: 'category',
			type: 'relationship',
			relationTo: COLLECTION_SLUG.CATEGORIES,
			label: 'Category',
			required: true,
			hasMany: false,
			admin: {
				position: 'sidebar',
				description: 'Product category',
			},
		},
		{
			name: 'tags',
			type: 'relationship',
			relationTo: COLLECTION_SLUG.TAGS,
			label: 'Tags',
			hasMany: true,
			admin: {
				position: 'sidebar',
				description:
					'Product tags (using for search and hashtags functionality)',
			},
		},
		{
			name: 'status',
			type: 'select',
			label: 'Product Status',
			required: true,
			options: [
				{label: 'Draft', value: 'draft'},
				{label: 'Active', value: 'active'},
				{label: 'Sold Out', value: 'sold'},
				{label: 'Coming Soon', value: 'coming'},
				{label: 'Archived', value: 'archived'},
			],
			defaultValue: 'draft',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'images',
			label: 'Product image(s)',
			type: 'array',
			maxRows: 4,
			required: true,
			labels: {
				singular: 'Image',
				plural: 'Images',
			},
			fields: [
				{
					name: 'image',
					type: 'upload',
					label: 'Image',
					relationTo: COLLECTION_SLUG.MEDIA,
					required: true,
				},
			],
		},
		{
			name: 'customSorting',
			type: 'checkbox',
			label: 'Custom Sorting',
			defaultValue: false,
			admin: {
				position: 'sidebar',
				description: 'Custom sorting of the product',
			},
		},
		{
			name: 'customSortingOrder',
			type: 'group',
			label: 'Custom Sorting Order',
			admin: {
				position: 'sidebar',
				condition: (data) => data.customSorting === true,
			},
			fields: [
				{
					name: 'isFavorite',
					type: 'checkbox',
					label: 'Is Favorite',
					defaultValue: false,
					admin: {
						description: 'Is the product shown as favorite',
					},
				},
				{
					name: 'customSortingRating',
					type: 'number',
					label: 'Rating (optional)',
					min: 0,
					max: 10,
					defaultValue: 0,
					admin: {
						description: 'Rating of the product for custom sorting',
					},
				},
			],
		},
		{
			name: 'priceId',
			access: {
				create: () => false,
				update: () => false,
				read: () => false,
			},
			type: 'text',
			admin: {
				hidden: true,
			},
		},
		{
			name: 'stripeId',
			access: {
				create: () => false,
				update: () => false,
				read: () => false,
			},
			type: 'text',
			admin: {
				hidden: true,
			},
		},
		{
			name: 'createdBy',
			type: 'relationship',
			relationTo: COLLECTION_SLUG.USERS,
			label: 'Created By',
			hasMany: false,
			admin: {
				position: 'sidebar',
				readOnly: true,
			},
		},
		slugField('name'),
	],
	timestamps: true,
}
