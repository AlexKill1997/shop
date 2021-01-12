<template lang="pug">
  SmallCatalog(:smallCatalogListItems="menuRoutes")
</template>

<script>
import SmallCatalog from '@/components/SmallCatalog.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    SmallCatalog
  },
  computed: {
    ...mapGetters({
      menuRoutes: "GET_MENU_ROUTES",
    })
  }
}
</script>