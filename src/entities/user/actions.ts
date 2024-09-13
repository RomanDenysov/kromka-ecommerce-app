'use server'

import {cache} from 'react'
import type {UserInfoFormData} from '~/features/checkout/models'
import {COLLECTION_SLUG} from '~/payload/config'
import type {User} from '~/payload/payload-types'
import {getPayload} from '~/payload/utils/get-payload'
import {auth} from '~/shared/lib/auth'

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
