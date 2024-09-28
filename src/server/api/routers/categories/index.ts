import {createTRPCRouter, publicProcedure} from '../../trpc'
import {fetchCategories} from './services'
import {categoriesSchema} from './models'

export const categoriesRouter = createTRPCRouter({
	getAll: publicProcedure.output(categoriesSchema).query(async () => {
		const categories = await fetchCategories()
		return categories
	}),
})