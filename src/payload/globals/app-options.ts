import type {GlobalConfig} from 'payload'
import {isAdmin} from '../access'
import {COLLECTION_SLUG} from '../config'

export const AppOptions: GlobalConfig = {
	slug: COLLECTION_SLUG.APP_OPTIONS,
	label: 'App Options',
	admin: {
		group: 'Settings',
	},
	access: {
		read: isAdmin,
		update: isAdmin,
	},
	fields: [
		{
			name: 'contactInfo',
			type: 'group',
			label: 'Contact Information',
			fields: [
				{
					name: 'mainEmail',
					type: 'email',
					label: 'Primary Email',
					required: true,
					defaultValue: 'admin@kromka.com',
				},
				{
					name: 'mainPhone',
					type: 'text',
					label: 'Primary Phone',
					required: true,
					defaultValue: '+420 123 456 789',
				},
				{
					name: 'address',
					type: 'textarea',
					label: 'Main Address',
				},
			],
		},
		{
			name: 'socialMedia',
			type: 'group',
			label: 'Social Media',
			fields: [
				{
					name: 'platforms',
					type: 'array',
					label: 'Social Media Platforms',
					fields: [
						{
							name: 'platform',
							type: 'select',
							options: [
								{label: 'Instagram', value: 'instagram'},
								{label: 'Facebook', value: 'facebook'},
								{label: 'Substack', value: 'substack'},
								{label: 'Twitter', value: 'twitter'},
								{label: 'YouTube', value: 'youtube'},
							],
						},
						{
							name: 'url',
							type: 'text',
							label: 'Profile URL',
						},
					],
				},
			],
		},
	],
}
