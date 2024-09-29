import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import type {Store} from '~/server/payload/payload-types'

type State = {
	stores: Store[]
	setStores: (stores: Store[]) => void
	currentStore: Store | null
	setCurrentStore: (store: Store | null) => void
}

export const useStoresState = create<State>()(
	persist(
		(set) => ({
			stores: [],
			setStores: (stores) => set({stores}),
			currentStore: null,
			setCurrentStore: (store) => set({currentStore: store}),
		}),
		{
			name: 'krmk_stores',
			storage: createJSONStorage(() => localStorage),
		},
	),
)
