// import payload from 'payload';
// import { COLLECTION_SLUG } from '~/payload/config';

// export const restockProducts = async () => {
//   const today = new Date().toISOString().split('T')[0];
//   const dayOfWeek = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();

//   // Получаем все продукты с ограниченной доступностью
//   const products = await payload.find({
//     collection: COLLECTION_SLUG.PRODUCTS,
//     where: {
//       availabilityType: { equals: 'limited' },
//     },
//   });

//   for (const product of products.docs) {
//     const { restockSchedule, storeInventory } = product;

//     // Проверяем, нужно ли пополнять запасы сегодня
//     const shouldRestock = shouldRestockToday(restockSchedule, today);

//     if (shouldRestock) {
//       // Получаем список активных магазинов
//       const stores = await payload.find({
//         collection: COLLECTION_SLUG.STORES,
//         where: {
//           isActive: { equals: true },
//         },
//       });

//       for (const store of stores.docs) {
//         const storeInv = storeInventory!.find(inv => inv.storeId === store.id);
//         if (!storeInv) continue;

//         let todayInventory = storeInv.dailyInventory!.find(inv => inv.date === today);
//         if (!todayInventory) {
//           todayInventory = { date: today, quantity: 0 };
//           storeInv.dailyInventory!.push(todayInventory);
//         }

//         // Пополняем запасы
//         todayInventory.quantity += restockSchedule!.quantity;

//         // Обновляем продукт в базе данных
//         await payload.update({
//           collection: COLLECTION_SLUG.PRODUCTS,
//           id: product.id,
//           data: {
//             storeInventory, 
//             lastRestockDate: today,
//            },
//         });
//       }
//     }
//   }
// };

// const shouldRestockToday = (restockSchedule: any, today: string) => {
//   const { frequency } = restockSchedule;
//   const lastRestockDate = new Date(restockSchedule.lastRestockDate || 0);
//   const currentDate = new Date(today);

//   switch (frequency) {
//     case 'daily':
//       return true;
//     case 'weekly':
//       return (currentDat:any - lastRestockDate:any) / (1000 * 60 * 60 * 24) >= 7;
//     case 'monthly':
//       return (
//         currentDate.getMonth() !== lastRestockDate.getMonth() ||
//         currentDate.getFullYear() !== lastRestockDate.getFullYear()
//       );
//     default:
//       return false;
//   }
// };

// // Функция для запуска пополнения запасов
// export const runRestock = async () => {
//   console.log('Starting restock process...');
//   await restockProducts();
//   console.log('Restock process completed.');
// };