export default async ({ store, route }) => {
  const { name } = route
  store.commit('updatePages', name.split("-")[0])
}
