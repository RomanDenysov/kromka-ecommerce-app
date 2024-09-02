import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string().email('Zadajte platnú e-mailovú adresu'),
})

export const passwordSchema = z.object({
  password: z.string().min(8, 'Heslo musí mať aspoň 8 znakov').max(64, 'Heslo nesmie mať viac ako 64 znakov'),
})

export const signUpSchema = emailSchema.merge(passwordSchema).extend({
  confirmPassword: z.string().min(8, 'Heslo musí mať aspoň 8 znakov').max(64, 'Heslo nesmie mať viac ako 64 znakov'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Heslá sa musia zhodovať",
  path: ["confirmPassword"],
})

export type SignUpFormData = z.infer<typeof signUpSchema>

export const loginSchema = emailSchema.merge(passwordSchema)

export type LoginFormData = z.infer<typeof loginSchema>