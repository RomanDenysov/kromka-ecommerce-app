import {TRPCError} from '@trpc/server'
import {InActionsError} from '~/shared/lib/errors'
import {createTRPCRouter, publicProcedure} from '../../trpc'
import {checkoutSchema} from './models'
import {getCheckoutSession} from './service'

export const checkoutRouter = createTRPCRouter({
	checkoutSession: publicProcedure
		.input(checkoutSchema)
		.mutation(async ({input}) => {
			try {
				const result = await getCheckoutSession(input)
				return result // Это вернет { url: string | null }
			} catch (error) {
				console.error('Error in checkoutRouter:', error)

				// Если ошибка является экземпляром InActionsError, обработайте ее соответствующим образом
				if (error instanceof InActionsError) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						message: error.message,
					})
				}

				// Для других ошибок возвращаем общую ошибку сервера
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to create checkout session',
				})
			}
		}),
})
