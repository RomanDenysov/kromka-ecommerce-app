import {categoriesRouter} from './routers/categories'
import {productsRouter} from './routers/products'
import {storesRouter} from './routers/stores'
import {createCallerFactory, createTRPCRouter} from './trpc'

export const appRouter = createTRPCRouter({
	categories: categoriesRouter,
	products: productsRouter,
	stores: storesRouter,
	users: {},
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)