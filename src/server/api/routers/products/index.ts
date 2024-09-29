import {createTRPCRouter, publicProcedure} from '../../trpc'
import {infiniteQueryValidator, productSlugValidator} from './models'
import {fetchInfiniteProducts, fetchProduct} from './services'

export const productsRouter = createTRPCRouter({
	getInfiniteProducts: publicProcedure
		.input(infiniteQueryValidator)
		.query(async ({input}) => {
			const products = await fetchInfiniteProducts(input)

			return products
		}),
	getProduct: publicProcedure
		.input(productSlugValidator)
		.query(async ({input}) => {
			const product = await fetchProduct(input)

			return product
		}),
})
