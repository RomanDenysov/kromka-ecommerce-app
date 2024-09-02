import {postgresAdapter} from '@payloadcms/db-postgres'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import {payloadCloudPlugin} from '@payloadcms/plugin-cloud'

import path from 'path'
import {buildConfig} from 'payload'
import {fileURLToPath} from 'url'
import sharp from 'sharp'

import {authjsPlugin} from 'payload-authjs'
import authConfig from '~/shared/lib/auth/auth.config'
import {env} from '~/env'
import {
  Addresses,
  Categories,
  Media,
  Orders,
  Products,
  Stores,
  Tags,
  Users,
} from './collections'
import { AppOptions } from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Stores, Addresses, Tags, Categories, Products, Orders],
  globals: [AppOptions],
  cors: ['https://checkout.stripe.com', env.NEXT_PUBLIC_SERVER_URL],
  csrf: ['https://checkout.stripe.com', env.NEXT_PUBLIC_SERVER_URL],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    autoGenerate: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URI,
    },
  }),
  sharp,
  plugins: [
    authjsPlugin({
      authjsConfig: authConfig,
    }),
    payloadCloudPlugin(),
  ],
})
