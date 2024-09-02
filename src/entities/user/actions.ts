'use server'

import { COLLECTION_SLUG } from "~/payload/config"
import type { User } from "~/payload/payload-types"
import { getPayload } from "~/payload/utils/get-payload"
import { auth } from "~/shared/lib/auth"

export async function register(email: string, password:string) {
  try {
    const payload = await getPayload()



    const user = await payload.create({
      collection: COLLECTION_SLUG.USERS,
      data: {
        email,
        role: 'user',
      }
    })
    return user
  } catch (error) {
    console.error('[USER ACTIONS]: Failed to register user', error)
    return null
  }
}

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

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const payload = await getPayload()
    const {docs: user} = await payload.find({
      collection: COLLECTION_SLUG.USERS,
      where: {
        email: {
          equals: email,
        }
      },
      depth: 3,
      limit: 1,
    })
    if (user.length === 0) return null
    
    return user[0]
  } catch (error) {
    console.error('[USER ACTIONS]: Failed to get user by email', error)
    return null
  }
}