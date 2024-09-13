import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import type {User} from '~/payload/payload-types'

type UserState = User

type State = {
	user: Partial<UserState> | null
	setUser: (user: Partial<UserState>) => void
}

export const useUser = create<State>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({user}),
		}),
		{
			name: 'krmk_user',
			storage: createJSONStorage(() => localStorage), // Используем localStorage для хранения данных пользователя
		},
	),
)
