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
    if(this.fetchOnServer) return

    const { store, route, redirect, req } = ctx
    const { region } = route.params
    console.log(`Nuxt до запроса: ${new Date().getSeconds()}`)

    if(!route.query) route.query = {}

    store.commit('category/SET_CATEGORY_ROUTES', {
      category: route.params.category,
      subcategory: route.params.subcategory,
      region: region
    })

    store.commit('product/SET_SORT', route.query.sort || 'price-down')
    store.commit('product/SET_LIMIT', route.query.limit || '15')

    // store.dispatch('product/getQueryString')

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