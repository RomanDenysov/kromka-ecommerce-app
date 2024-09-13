// import {CollectionBeforeOperationHook} from 'payload'
// import { Product } from '~/payload-types'

// export const stripeIdCreator: CollectionBeforeOperationHook = async ({ args, operation }) => {
//   const data = args.data
//   if (operation === 'create') {
//     const createdProduct = await stripe.products.create({
//       name: data.name,
//       default_price_data: {
//         currency: 'eur',
//         unit_amount: Math.round(data.price * 100),
//       },
//     })

//     const updated: Product = {
//       ...data,
//       stripeId: createdProduct.id,
//       priceId: createdProduct.default_price.id as string,
//     }

//     return updated
//   } else if (operation === 'update') {
//     const updatedProduct = await stripe.products.update(data.stripeId!, {
//             name: data.name,
//             default_price: data.priceId!,
//           })
//           const updated: Product = {
//             ...data,
//             stripeId: updatedProduct.id,
//             priceId: updatedProduct.default_price.id as string,
//           }

//           return updated
//         }
//   }
// }
