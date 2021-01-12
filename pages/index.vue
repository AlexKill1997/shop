<template lang="pug">
  #index
    FirstScreen
    SmallCatalog(
      v-if="menuRoutes.length > 0"
      :smallCatalogListItems='menuRoutes'
    )
    //- PopularItems(
    //-   :popularItems='additionalProducts.popularItems')
    //- SalesItems(
    //-   :items='additionalProducts.salesItems')
    Advantages
    GetMobileApp
    //- Brands(
      :brands='mainContent.brands'
    //- )
    Logistics
    CskClub
    MainMap
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import FirstScreen from '@/components/FirstScreen.vue'
import SmallCatalog from '@/components/SmallCatalog.vue'
import PopularItems from '@/components/PopularItems.vue'
import SalesItems from '@/components/SalesItems.vue'
import Advantages from '@/components/Advantages.vue'
import GetMobileApp from '@/components/GetMobileApp.vue'
import Brands from '@/components/Brands.vue'
import Logistics from '@/components/Logistics.vue'
import CskClub from '@/components/CskClub.vue'
import MainMap from '@/components/MainMap.vue'

export default {
  name: 'IndexPage',
  components: {
    FirstScreen,
    SmallCatalog,
    PopularItems,
    SalesItems,
    Advantages,
    GetMobileApp,
    Brands,
    Logistics,
    CskClub,
    MainMap
  },

  computed: {
    ...mapGetters({
      additionalProducts: 'product/GET_ADDITIONAL_PRODUCTS',
      mainContent: 'GET_MAIN_CONTENT',
      menuRoutes: 'GET_MENU_ROUTES'
    })
  },
  head() {
    return this.$seo({
      title: 'Купить строительные материалы в интернет гипермаркете ТД ЦСК с доставкой по Москве и МО',
      keywords: 'магазин стройматериалов, сайт стройматериалы, купить стройматериалы, стройматериалы москва, стройматериалы с доставкой, строительные материалы москва, купить строительные материалы, интернет магазин строительных материалов',
      description: 'В нашем интернет магазине стройматериалов мы делаем доступными строительство и ремонт дома: у нас выгодные цены, большой перечень товаров в наличии и доставка по Москве и МО.',
    })
  },
  async mounted() {
    if(this.mainContent.brands.length === 0) {
      await this.getBrands()
    }
  },
  methods:{
    ...mapActions({
      getBrands: "getBrands",
    }),
    hide(){
      this.$dispatch(this.inputType = false)
    }
  },
}
</script>
<style lang="sass">
  body
    position: relative
  p
    margin: 0

</style>
