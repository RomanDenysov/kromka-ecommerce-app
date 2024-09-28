import type {DefaultSession, NextAuthConfig, Profile} from 'next-auth'
import type {JWT} from 'next-auth/jwt'
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'
import Resend from 'next-auth/providers/resend'

type RoleOptions = 'admin' | 'user' | 'editor' | 'b2b'
declare module 'next-auth/jwt' {
	interface JWT extends Pick<Profile, 'role'> {
		id: string
	}
}

declare module 'next-auth' {
	interface Profile {
		role: RoleOptions
	}
	interface User extends Pick<JWT, 'id' | 'role'> {}
	interface Session extends DefaultSession {
		user: User & DefaultSession['user']
	} 
}

const authConfig: NextAuthConfig = {
	providers: [
		Google({
			allowDangerousEmailAccountLinking: true,
			profile(profile) {
				return {
					id: profile.sub,
					role: profile.role,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
				}
			},
		}),
		Nodemailer({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
		Resend({
			// If your environment variable is named differently than default
			apiKey: process.env.AUTH_RESEND_KEY,
			from: 'no-reply@resend.dev',
		}),
	],
	callbacks: {
		jwt: async ({token, user, profile}) => {
			// console.log("JWT Callback - User:", user);
			// console.log("JWT Callback - Profile:", profile);
			if (user) {
				if (user.id) {
					token.id = user.id as string
				}
			} else {
				// console.warn("User does not have an ID.");
			}
			if (profile && 'role' in profile) {
				token.role = profile.role
			}
			return token
		},
		session: async ({session, token}) => {
			if (token) {
				if (token.id) {
					session.user.id = token.id // Используем sub, если id отсутствует
					session.user.role = token.role as 'admin' | 'user' | 'editor' | 'b2b'
				}
				session.user.role = token.role
			}
			return session
		},
		authorized: async ({auth}) => {
			// Logged in users are authenticated, otherwise redirect to login page
			return !!auth?.user
		},
	},
}

export default authConfig
