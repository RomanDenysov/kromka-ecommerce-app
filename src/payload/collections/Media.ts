import type {CollectionConfig} from 'payload'
import path from 'path'
import {fileURLToPath} from 'url'
import {isAdmin} from '~/payload/access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: () => false,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Describes the image for screen readers and search engines. e.g. "A picture of a croissant"',
        placeholder: 'A picture of a croissant',
      },
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../../public/media'),
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'image/webp',
    ],
  },
}
