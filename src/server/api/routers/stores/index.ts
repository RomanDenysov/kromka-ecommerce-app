import {createTRPCRouter, publicProcedure} from '../../trpc'
import {fetchStores, setStore} from './service'
import {storeIdValidator, storesSchema} from './validators'

export const storesRouter = createTRPCRouter({
	getStores: publicProcedure.output(storesSchema).query(async () => {
		const stores = await fetchStores()
		return stores
	}),
	setStore: publicProcedure
		.input(storeIdValidator)
		.mutation(async ({input}) => {
			const storeId = input
			const {success} = await setStore(storeId)
			return {success}
		}),
})