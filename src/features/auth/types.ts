import type {ControllerRenderProps, FieldPath} from 'react-hook-form'
import type {z} from 'zod'

export type AuthState = 'signIn' | 'signUp'

export type AuthFormProps<T extends z.ZodType> = {
	schema: T
	onSubmit: (data: z.infer<T>) => void
	submitButtonText: string
	fields: Array<{
		name: FieldPath<z.infer<T>>
		label: string
		type: string
		placeholder?: string
		render?: (props: {
			field: ControllerRenderProps<z.infer<T>, FieldPath<z.infer<T>>>
		}) => React.ReactNode
	}>
	children?: React.ReactNode
}
