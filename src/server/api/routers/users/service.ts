import 'server-only'

import {cache} from 'react'
import {env} from '~/env'
import type {UserInfoFormData} from '~/features/checkout/models'
import {auth, signIn} from '~/server/auth'
import {COLLECTION_SLUG} from '~/server/payload/config'
import type {User} from '~/server/payload/payload-types'
import {getPayload} from '~/server/payload/utils/get-payload'

export async function getUser(): Promise<User | null> {
	try {
		const payload = await getPayload()
		const session = await auth()

		if (!session || !session?.user) return null
		const userId = session.user.id

		if (!userId) return null

		const user = payload.findByID({
			collection: COLLECTION_SLUG.USERS,
			id: userId,
			depth: 3,
		})

		return user
	} catch (error) {
		console.error('[USER ACTIONS]: Failed to get user', error)
		return null
	}
}

export const getCachedUser = cache(getUser)

export async function updateUserInfo(data: UserInfoFormData) {
	const payload = await getPayload()

	try {
		const user = await getUser()
		if (!user) return null

		const updatedUser = await payload.update({
			collection: COLLECTION_SLUG.USERS,
			id: user.id,
			data: {
				name: data.name,
				email: data.email,
				phone: data.phone,
				acceptedTerms: data.terms,
			},
		})

		return updatedUser
	} catch (error) {
		console.error('[USER ACTIONS]: Failed to update user info', error)
		return null
	}
}

export async function signInWithEmail(email: string) {
	const confirmUrl = new URL(
		`${env.NEXT_PUBLIC_SERVER_URL}/confirm-email?email=${email}`,
	)
	const redirectLink = email.split('@')[1]

	console.log(
		'🚀 ~ file: service.ts:67 ~ signInWithEmail ~ redirectLink:',
		redirectLink,
	)

	try {
		await signIn('nodemailer', {email, redirectTo: '/'})
		return {success: true, url: confirmUrl.toString(), emailLink: redirectLink}
	} catch (error) {
		console.error('[SIGN IN WITH EMAIL]:', error)
		return {success: false, url: null, emailLink: ''}
	}
}