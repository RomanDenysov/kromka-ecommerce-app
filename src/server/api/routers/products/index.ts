import {TRPCError} from '@trpc/server'
import {InActionsError} from '~/shared/lib/errors'
import {createTRPCRouter, publicProcedure} from '../../trpc'
import {infiniteQueryValidator, productSlugValidator} from './models'
import {fetchInfiniteProducts, fetchProduct} from './services'

export const productsRouter = createTRPCRouter({
	getInfiniteProducts: publicProcedure
		.input(infiniteQueryValidator)
		.query(async ({input, ctx}) => {
			const products = await fetchInfiniteProducts(ctx.payload, input)

			if (Error instanceof InActionsError) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: Error.message,
				})
			}

			return products
		}),
	getProduct: publicProcedure
		.input(productSlugValidator)
		.query(async ({input, ctx}) => {
			const product = await fetchProduct(ctx.payload, input)

			return product
		}),
})
