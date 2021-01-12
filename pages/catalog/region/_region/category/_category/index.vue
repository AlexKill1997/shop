<template lang="pug">
  vCatalog(v-if="CATEGORY" type="no-products")
</template>

<script>
import { mapGetters } from 'vuex';

import catalogMixin from '@/components/catalog/mixin';
import vCatalog from '@/components/catalog.vue';
import seoCategoryPageMixin from '@/components/mixins/catalog/seoCategoryPage';

export default {
  fetch({ store, route, redirect }) {
    if(this.fetchOnServer) return

    const getCat = store.getters['GET_CURRENT_CATEGORY']
    const cat = getCat(route.params.category)

    if(!cat) return redirect("/")

    store.commit('category/SET_CURRENT_CATEGORY', cat)
  },
  components: {
    vCatalog
  },
  mixins: [seoCategoryPageMixin, catalogMixin]
}
</script>