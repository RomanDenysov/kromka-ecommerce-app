import {CollectionConfig} from 'payload'
import {COLLECTION_SLUG} from '~/payload/config'
import {isAdmin} from '~/payload/access'

export const Addresses: CollectionConfig = {
  slug: COLLECTION_SLUG.ADDRESSES,
  admin: {
    useAsTitle: 'street',
    defaultColumns: ['street', 'city', 'zip', 'country'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'street',
      type: 'text',
      label: 'Street',
      required: true,
    },
    {
      name: 'street2',
      type: 'text',
      label: 'Street 2 (optional)',
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
      required: true,
    },
    {
      name: 'zip',
      type: 'text',
      label: 'Zip Code',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country',
      required: true,
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      label: 'Google Maps URL',
    },
    {
      name: 'latitude',
      type: 'number',
      label: 'Latitude',
      admin: {
        step: 0.000001,
      },
    },
    {
      name: 'longitude',
      type: 'number',
      label: 'Longitude',
      admin: {
        step: 0.000001,
      },
    },
  ],
}
