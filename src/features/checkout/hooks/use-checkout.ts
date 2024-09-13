import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import type {CheckoutFormData} from '../models'

type CheckoutStore = {
	checkout: Partial<CheckoutFormData>
	setCheckout: (data: Partial<CheckoutFormData>) => void
	resetCheckout: () => void
}

const initialCheckoutState: Partial<CheckoutFormData> = {
	paymentMethod: 'inStore',
	deliveryMethod: 'pickup',
	store: {name: ''},
	pickupDate: new Date(),
}

export const useCheckout = create<CheckoutStore>()(
	persist(
		(set) => ({
			checkout: initialCheckoutState,
			setCheckout: (data) =>
				set((state) => ({
					checkout: {...state.checkout, ...data},
				})),
			resetCheckout: () => set({checkout: initialCheckoutState}),
		}),
		{
			name: 'krmk-checkout',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
)
