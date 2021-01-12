<template lang="pug">
  vCatalog(type="category")
</template>

<script>
import vCatalog from "@/components/catalog.vue"

export default {
  components: {
    vCatalog
  },
  
  async fetch({ store, $axios, route }) {
    const result = await store.dispatch('product/getProducts', {
      category: route.params.cat,
      subcategory: route.params.subcat,
      query: {
        page: 1,
        limit: 15,
        sort: 'price-down',
        ...route.query,
        preload: true
      }
    })

    store.dispatch('product/setProductsProperties', result.filters)
    store.dispatch('product/setProductsFilters')
  },
}
</script>