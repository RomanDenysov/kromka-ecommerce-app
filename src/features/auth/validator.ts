import {z} from 'zod'

export const emailSchema = z.object({
	email: z.string().email('Zadajte platnú e-mailovú adresu'),
})

export type EmailFormData = z.infer<typeof emailSchema>
