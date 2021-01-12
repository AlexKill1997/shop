<template lang="pug">
  vCatalog(type="brand")
</template>

<script>
import vCatalog from "@/components/catalog.vue"

export default {
  components: {
    vCatalog
  },

  async fetch({ store, $axios, route, redirect }) {
    store.commit('category/SET_CATEGORY_ROUTES', {
      brand: route.params.brand,
      region: route.params.region
    })

    store.commit('product/SET_SORT', route.query.sort || 'price-down')
    store.commit('product/SET_LIMIT', route.query.limit || '15')
    // store.dispatch('products/getQueryString')

    const result = await store.dispatch('product/getBrandProducts', {
      query: {
        page: 1,
        // ...route.query,
        preload: true
      },
      axios: $axios
    })

    if(!result) redirect("/")

    store.dispatch('product/setProductsProperties', result.filters)
    store.dispatch('product/setProductsFilters')
  },
}
</script>