import type {CollectionBeforeOperationHook, PayloadRequest} from 'payload'
import type {Product, Store} from '~/payload-types'
import {COLLECTION_SLUG} from '~/payload/config'

let storeCache: Store[] | null = null

const getStores = async (req: PayloadRequest): Promise<Store[]> => {
  if (!storeCache) {
    const stores = await req.payload.find({
      collection: COLLECTION_SLUG.STORES,
      where: {
        isActive: {equals: true},
      },
    })
    storeCache = stores.docs as Store[]
  }
  return storeCache
}

export const manageInventory: CollectionBeforeOperationHook = async ({
  args,
  req,
}) => {
  const data = args.data as Partial<Product>
  if (data.availabilityType === 'limited') {
    const today = new Date().toISOString().split('T')[0]

    if (!data.storeInventory) {
      data.storeInventory = []
    }

    const stores = await getStores(req)

    stores.forEach((store) => {
      const storeInventory = data.storeInventory?.find(
        (inv) => inv.storeId === store.id,
      )
      if (!storeInventory) {
        data.storeInventory?.push({
          storeId: store.id,
          dailyInventory: [],
        })
      }

      const todayInventory = storeInventory?.dailyInventory?.find(
        (inv) => inv.date === today,
      )
      if (!todayInventory) {
        const defaultQuantity =
          data.availability?.find(
            (av) =>
              av.day.toLowerCase() ===
              new Date()
                .toLocaleString('en-us', {weekday: 'long'})
                .toLowerCase(),
          )?.quantity || 0

        storeInventory?.dailyInventory?.push({
          date: today,
          quantity: defaultQuantity,
        })
      }
    })
  }
  return data
}
