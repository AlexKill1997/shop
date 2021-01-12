export default async ({ store, $axios }) => {
  if (store.getters['user/GET_VERIFIED']) return

  await store.dispatch('user/getUser', $axios)
}