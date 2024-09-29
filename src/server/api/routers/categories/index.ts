import {createTRPCRouter, publicProcedure} from '../../trpc'
import {categoriesSchema} from './models'
import {fetchCategories} from './services'

export const categoriesRouter = createTRPCRouter({
	getAll: publicProcedure.output(categoriesSchema).query(async () => {
		const categories = await fetchCategories()
		return categories
	}),
})
