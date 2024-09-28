import type {CollectionConfig} from 'payload'
import {isAdmin, isAdminOrEditor} from '~/server/payload/access'
import {COLLECTION_SLUG} from '~/server/payload/config'
import slugField from '~/server/payload/fields/slug'

export const Posts: CollectionConfig = {
	slug: COLLECTION_SLUG.POSTS,
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'status', 'publishedDate', 'categories'],
	},
	access: {
		read: () => true,
		create: isAdminOrEditor,
		update: isAdminOrEditor,
		delete: isAdmin,
	},
	versions: {
		drafts: true,
	},
	hooks: {
		beforeChange: [
			({req, operation, data}) => {
				if (operation === 'create') {
					if (req.user) {
						data.author = req.user.id
					} else {
						throw new Error('You must be logged in to create a post')
					}

					if (data.status === 'published' && !data.publishedDate) {
						data.publishedDate = new Date()
					}
				}

				if (!data.seo?.title) {
					data.seo = {
						...data.seo,
						title: data.title,
					}
				}
				if (!data.seo?.description && data.excerpt) {
					data.seo = {
						...data.seo,
						description: data.excerpt,
					}
				}

				return data
			},
		],
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: 'Title',
			required: true,
			unique: true,
		},
		slugField('title'),
		{
			name: 'author',
			type: 'relationship',
			relationTo: COLLECTION_SLUG.USERS,
			hasMany: false,
			admin: {
				position: 'sidebar',
				readOnly: true,
				condition: (data) => Boolean(data?.author),
			},
		},
		{
			name: 'publishedDate',
			type: 'date',
			label: 'Published Date',
			admin: {
				position: 'sidebar',
				date: {
					pickerAppearance: 'dayAndTime',
				},
			},
		},
		{
			name: 'featuredImage',
			type: 'upload',
			relationTo: COLLECTION_SLUG.MEDIA,
			required: true,
			admin: {
				description:
					'This image will be used as the featured image for the post',
			},
		},
		{
			name: 'status',
			type: 'select',
			label: 'Status',
			required: true,
			options: [
				{label: 'Draft', value: 'draft'},
				{label: 'Published', value: 'published'},
				{label: 'Archived', value: 'archived'},
			],
			defaultValue: 'draft',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'excerpt',
			type: 'textarea',
			label: 'Excerpt',
			required: true,
			admin: {
				description: 'A short summary of the post content',
			},
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
						description: 'Rating of the posts for custom sorting',
					},
				},
			],
		},
		{
			name: 'content',
			type: 'richText',
			label: 'Content',
			required: true,
		},
		{
			name: 'tags',
			type: 'relationship',
			relationTo: COLLECTION_SLUG.TAGS,
			hasMany: true,
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'additionalImages',
			label: 'Additional Images',
			type: 'array',
			maxRows: 4,
			labels: {
				singular: 'Image',
				plural: 'Images',
			},
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: COLLECTION_SLUG.MEDIA,
					required: true,
				},
				{
					name: 'caption',
					type: 'text',
					label: 'Caption',
				},
			],
		},
		{
			name: 'seo',
			type: 'group',
			label: 'SEO Settings',
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'SEO Title',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'SEO Description',
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: COLLECTION_SLUG.MEDIA,
					label: 'SEO Image',
				},
			],
		},
	],
	timestamps: true,
}
