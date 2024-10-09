import {emailSchema} from '~/features/auth/validator'
import {createTRPCRouter, publicProcedure} from '../../trpc'
import {signInWithEmail} from './service'

export const userRouter = createTRPCRouter({
	loginEmail: publicProcedure.input(emailSchema).mutation(async ({input}) => {
		const {email} = input
		const result = await signInWithEmail(email)
		return result
	}),

	getUser: publicProcedure.query(async ({ctx}) => {
		const {session} = ctx
		const user = session?.user
		return user
	}),
})