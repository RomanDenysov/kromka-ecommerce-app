import {CollectionConfig} from 'payload'
import {COLLECTION_SLUG} from '~/payload/config'
import slugField from '~/payload/fields/slug'
import {isAdmin} from '~/payload/access'

export const Categories: CollectionConfig = {
  slug: COLLECTION_SLUG.CATEGORIES,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: () => false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Category Name',
      required: true,
      unique: true,
    },
    slugField('name'),
    {
      name: 'parent',
      type: 'relationship',
      relationTo: COLLECTION_SLUG.CATEGORIES,
      label: 'Parent Category ',
      filterOptions: ({id}) => {
        return {
          id: {
            not_equals: id,
          },
        }
      },
    },
  ],
}
