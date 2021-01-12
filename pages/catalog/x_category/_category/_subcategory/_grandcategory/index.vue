<template lang="pug">
  vCatalog(type="category")
</template>

<script>
import vCatalog from "@/components/catalog.vue"
import axios from '~/services/axios'
import seoCategoryPageMixin from '@/components/mixins/catalog/seoCategoryPage';

export default {
  components: {
    vCatalog
  },
  
  async fetch(ctx) {
    const { store, route, redirect, req } = ctx

    if(!route.query) route.query = {}

    store.commit('category/SET_CATEGORY_ROUTES', {
      category: route.params.category,
      subcategory: route.params.subcategory,
      grandcategory: route.params.grandcategory
    })

    store.commit('product/SET_SORT', route.query.sort || 'price-down')
    store.commit('product/SET_LIMIT', route.query.limit || '15')

    store.commit('category/SET_CURRENT_CATEGORY', {})

    store.dispatch('product/getQueryString')

    const result = await store.dispatch('product/getProducts', {
      query: {
        page: 1,
        // ...route.query,
        preload: true
      },
      axios: ctx.$axios
    })

    if(!result) return redirect("/")

    store.dispatch('product/setProductsProperties', result.filters)
    store.dispatch('product/setProductsFilters')
  },
  mixins: [seoCategoryPageMixin]
}
</script>