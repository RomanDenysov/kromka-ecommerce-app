import type {CollectionConfig} from 'payload'

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
  ],
}
