import {CollectionConfig} from 'payload'
import {COLLECTION_SLUG} from '~/payload/config'
import slugField from '~/payload/fields/slug'
import {isAdmin} from '~/payload/access'
import {manageInventory} from './hooks/manageInventory'

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
  //TODO: Add hooks for stripe Id
  hooks: {
    beforeChange: [manageInventory],
  },
  fields: [
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: COLLECTION_SLUG.USERS,
      label: 'Created By',
      required: true,
      hasMany: false,
      admin: {
        hidden: true,
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({req, operation, data}) => {
            if (operation === 'create') {
              if (req.user) {
                data!.createdBy = req.user.id
                return data
              }
            }
          },
        ],
      },
    },
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
      admin: {
        description: 'Product description',
      },
    },
    {
      name: 'composition',
      type: 'textarea',
      admin: {
        description: 'Product composition or any useful information about the product',
      },
    },
    {
      name: 'ingredients',
      type: 'array',
      label: 'Ingredients',
      fields: [
        {
          name: 'ingredient',
          type: 'text',
          required: true,
        },
      ],
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
      },
    },
    
    {
      name: 'category',
      type: 'relationship',
      relationTo: COLLECTION_SLUG.PRODUCTS,
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
        description:
          'Statuses: Archived, Draft does not show in the storefront. Draft is a default status for new products. Active is the default status for products that are ready to be sold.',
      },
    },
    {
      name: 'images',
      label: 'Product image(s)',
      type: 'array',
      minRows: 1,
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
        {
          name: 'altText',
          type: 'text',
          label: 'Alternative Text',
          admin: {
            description:
              'Each image already should be with alt text. Use it if you want different alt then image already have. (optional)',
          },
        },
      ],
    },
    {
      name: 'allergens',
      type: 'array',
      label: 'Allergens',
      fields: [
        {
          name: 'allergen',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Product allergens (optional)',
      },
    },
    {
      name: 'customSorting',
      type: 'radio',
      label: 'Custom Sorting',
      options: [
        {
          label: 'Yes',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
      ],
      defaultValue: 'no',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Custom sorting of the product',
      }
    },
    {
      name: 'customSortingOrder',
      type: 'group',
      label: 'Custom Sorting Order',
      admin: {
            position: 'sidebar',
            condition: (data) => data.customSorting === 'yes',
          },
      fields: [
        {
          name: 'isFavorite',
          type: 'checkbox',
          label: 'Is Favorite',
          defaultValue: false,
          admin: {
            description: 'Is the product shown as favorite',
          }
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
          }
        },
      ]
    },
    {
      name: 'availabilityType',
      type: 'radio',
      label: 'Availability type',
      options: [
        {
          label: 'Always',
          value: 'always',
        },
        {
          label: 'Limited',
          value: 'limited',
        },
      ],
      defaultValue: 'always',
      required: true,
    },
    {
      name: 'availability',
      type: 'array',
      label: 'Default Daily Availability',
      admin: {
        condition: (data) => data.availabilityType === 'limited',
        description:
          'Default daily availability for the product if it is limited',
      },
      fields: [
        {
          name: 'day',
          type: 'select',
          label: 'Day',
          required: true,
          options: [
            {label: 'Monday', value: 'monday'},
            {label: 'Tuesday', value: 'tuesday'},
            {label: 'Wednesday', value: 'wednesday'},
            {label: 'Thursday', value: 'thursday'},
            {label: 'Friday', value: 'friday'},
            {label: 'Saturday', value: 'saturday'},
            {label: 'Sunday', value: 'sunday'},
          ],
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Default Quantity',
          required: true,
          min: 0,
        },
      ],
    },
    {
      name: 'storeInventory',
      type: 'array',
      label: 'Store-Specific Inventory',
      admin: {
        condition: (data) => data.availabilityType === 'limited',
        // TODO: Add description for this field and my email
        description:
          'This field is automatically managed by the system. Contact your developer if you need to change it.',
      },
      fields: [
        {
          name: 'storeId',
          type: 'relationship',
          relationTo: COLLECTION_SLUG.STORES,
          label: 'Store',
          required: true,
        },
        {
          name: 'dailyInventory',
          type: 'array',
          label: 'Daily Inventory',
          fields: [
            {
              name: 'date',
              type: 'date',
              label: 'Date',
              required: true,
            },
            {
              name: 'quantity',
              type: 'number',
              label: 'Available Quantity',
              required: true,
              min: 0,
            },
          ],
        },
      ],
    },
    {
      name: 'restockSchedule',
      type: 'group',
      label: 'Restock Schedule',
      admin: {
        condition: (data) => data.availabilityType === 'limited',
      },
      fields: [
        {
          name: 'frequency',
          type: 'select',
          label: 'Restock Frequency',
          options: [
            {label: 'Daily', value: 'daily'},
            {label: 'Weekly', value: 'weekly'},
            {label: 'Monthly', value: 'monthly'},
            {label: 'Yearly', value: 'yearly'},
          ],
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Restock Quantity',
          required: true,
          min: 0,
        },
        {
          name: 'days',
          type: 'array',
          label: 'Restock Days',
          fields: [
            {
              name: 'day',
              type: 'select',
              label: 'Day',
              required: true,
              options: [
                {label: 'Monday', value: 'monday'},
                {label: 'Tuesday', value: 'tuesday'},
                {label: 'Wednesday', value: 'wednesday'},
                {label: 'Thursday', value: 'thursday'},
                {label: 'Friday', value: 'friday'},
                {label: 'Saturday', value: 'saturday'},
                {label: 'Sunday', value: 'sunday'},
              ],
            },
          ],
        },
      ],
    },
    // TODO: Add last restock date for restocking functionality
//     {
//   name: 'lastRestockDate',
//   type: 'date',
//   admin: {
//     readOnly: true,
//     position: 'sidebar',
//     description: 'Last date when this product was restocked',
//   },
// },
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
    slugField('name'),
  ],
  timestamps: true,
}
