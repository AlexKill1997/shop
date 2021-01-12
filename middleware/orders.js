export default async ({ store, $axios }) => {
  if(!store.getters['user/GET_USER']) return
  await store.dispatch('orders/getOrders', {$axios})
}