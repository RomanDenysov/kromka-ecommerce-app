import {type Field, type FieldHook, deepMerge} from 'payload'

const format = (val: string): string =>
	val
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
		.toLowerCase()

const formatSlug =
	(fallback: string): FieldHook =>
	({operation, value, originalDoc, data}) => {
		if (typeof value === 'string' && value.length > 0) {
			return format(value)
		}

		if (operation === 'create') {
			const fallbackData = data?.[fallback] || originalDoc?.[fallback]

			if (fallbackData && typeof fallbackData === 'string') {
				return format(fallbackData)
			}
		}

		return value
	}

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field

const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
	return deepMerge<Field, Partial<Field>>(
		{
			name: 'slug',
			label: 'Slug',
			type: 'text',
			index: true,
			unique: true,
			required: false, // Need to be false so that we can use beforeValidate hook to set slug.
			admin: {
				position: 'sidebar',
				description:
					'Slug of the object (uses for unique identification / url) e.g. Name of the Project: name-of-the-object',
			},
			hooks: {
				beforeValidate: [formatSlug(fieldToUse)],
			},
		},
		overrides,
	)
}

export default slugField
