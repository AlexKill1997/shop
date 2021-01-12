export default async ({ store }) => {
  store.commit("product/CLEAR_PRODUCTS_DATA")
  store.commit("product/RESET_DATA")
  // store.commit("category/SET_LOADING", true)
  store.commit("category/RESET_DATA")
  store.commit("category/CLEAR_CATEGORY")
}