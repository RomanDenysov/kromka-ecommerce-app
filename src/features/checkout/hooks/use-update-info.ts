import {useMutation, useQueryClient} from '@tanstack/react-query'
import {updateUserInfo} from '~/entities/user/actions'
import {useUser} from '~/features/user/hooks/use-user'
import type {UserInfoFormData} from '../models'

export default function useUpdateInfoMutation() {
	const setUser = useUser((state) => state.setUser)
	const queryClient = useQueryClient()

	const {mutate, isPending, isSuccess, error} = useMutation({
		mutationFn: async (data: UserInfoFormData) => {
			const user = await updateUserInfo(data)
			return user
		},
		onSuccess: (user) => {
			if (user) {
				setUser(user)
			}
		},
		onError: () => {
			console.debug('useUpdateInfoMutation:onError', error)
		},
	})
}
