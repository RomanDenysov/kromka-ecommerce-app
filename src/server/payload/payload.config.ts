import {postgresAdapter} from '@payloadcms/db-postgres'
import {payloadCloudPlugin} from '@payloadcms/plugin-cloud'
import {lexicalEditor} from '@payloadcms/richtext-lexical'

import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {buildConfig} from 'payload'
import sharp from 'sharp'

import {authjsPlugin} from 'payload-authjs'
import {env} from '~/env'
import authConfig from '~/server/auth/auth.config'
import {
	Addresses,
	Categories,
	Inventory,
	Media,
	Orders,
	Products,
	Stores,
	Tags,
	Users,
} from './collections'
import {AppOptions} from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [
		Users,
		Media,
		Stores,
		Addresses,
		Tags,
		Categories,
		Products,
		Orders,
		Inventory,
	],
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
		push: true,
	}),
	sharp,
	plugins: [
		authjsPlugin({
			authjsConfig: authConfig,
		}),
		payloadCloudPlugin(),
	],
})
