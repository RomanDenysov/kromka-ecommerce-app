import {CollectionConfig} from 'payload'
import {COLLECTION_SLUG} from '~/payload/config'

export const Tags: CollectionConfig = {
  slug: COLLECTION_SLUG.TAGS,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Tag Name',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Rating (optional)',
      min: 0,
      max: 10,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (optional)',
    }
  ],
}
