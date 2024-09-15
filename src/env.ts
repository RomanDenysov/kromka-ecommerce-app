import {createEnv} from '@t3-oss/env-nextjs'
import {z} from 'zod'

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(['development', 'production', 'test'])
			.default('development'),

		DATABASE_URI: z.string().min(1),

		AUTH_GOOGLE_ID: z.string().min(1),
		AUTH_GOOGLE_SECRET: z.string().min(1),

		AUTH_SECRET: z.string().min(1),

		PAYLOAD_SECRET: z.string().min(1),

		EMAIL_SERVER: z.string().min(1),
		EMAIL_FROM: z.string().min(1),
		EMAIL_HOST: z.string().min(1),
		EMAIL_PASS: z.string().min(1),

		STRIPE_SECRET_KEY: z.string().min(1),
	},

	client: {
		NEXT_PUBLIC_SERVER_URL: z.string().min(1),
		NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string().min(1),
	},

	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		DATABASE_URI: process.env.DATABASE_URI,

		AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
		AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,

		AUTH_SECRET: process.env.AUTH_SECRET,

		PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,

		NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,

		EMAIL_SERVER: process.env.EMAIL_SERVER,
		EMAIL_FROM: process.env.EMAIL_FROM,
		EMAIL_HOST: process.env.EMAIL_HOST,
		EMAIL_PASS: process.env.EMAIL_PASS,

		NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
})
