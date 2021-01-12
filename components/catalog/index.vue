<template lang="pug">
  #v-catalog
    //-  Фильтры
    MobileFilters(
      :parentShow="isTurn2"
      :filterShow="filter"
      @close="filter = $event"
      @toggle="isTurn2 = $event"
      @apply="applyFilter"
      @clear="clearFilter"
    )

    //- Подкатегории

    MobileCategories(
      :subcategories="subcategories"
      @close="subcategories = $event"
    )

    vBreadcrumbs(:breadcrumbs="breadcrumbs")
    template(v-if="CATEGORY.parentName")
      h1.v-catalog__heading {{ CATEGORY.parentName }}
    .v-catalog
      .v-catalog__aside
        //- Категории
        Categories(
          :parentShow="isTurn1"
          @toggle="isTurn1 = $event"
        )

        //- Фильтры для телефона
        MainFilters(
          :parentShow="isTurn2"
          @toggle="isTurn2 = $event"
          @apply="applyFilter"
          @clear="clearFilter"
        )

      .v-catalog__content(:class="{'notshow': filter || subcategories}")
        img(:src="require('@/assets/images/items/'+ banners[getRndInteger].image)")
        template(v-if="CATEGORY.subcategories && CATEGORY.subcategories.length")
          CategoriesCards(:cards="CATEGORY.subcategories")
        template(v-else-if="CATEGORY.neighbors && CATEGORY.neighbors.length")
          CategoriesCards(:cards="CATEGORY.neighbors")
        CatalogProducts(
          ref="catalogProducts"
          :subcategoriesView="subcategories"
          :filters="PRODUCT_FILTERS"
          :filtersView="filter"
          @toggle:subcategories="subcategories = $event"
          @toggle:filter="filter = $event"
          @change:product-page-count="changeProductPageHandler"
          @change:sort-method="sortMethodHandler"
        )
          template(v-slot:pagination)
            .v-catalog__items-more
              .v-catalog__items-more-usual
                span.items-more(@click="showMore" v-if="pageNumber!=pagesCount.length") Показать ещё {{limit}} товаров
              .v-catelog__items-summary-prodCount
                span.items-summary Всего {{countProduct()}} товаров
              .v-catalog__items-more-mobile
                span.items-more(@click="showMore" v-if="pageNumber!=pagesCount.length") + показать еще
            Pagination(:pagesCount="pagesCount" @paginate="paginationHandler($event)")
        SeoProduct(:seocontent="CATEGORY.description")
    vCta
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import catalogMixin from '@/components/catalog/mixin'
import productsCountPreloadMixin from '@/components/mixins/catalog/productsCountPreloadMixin'

export default {
  name: 'Catalog',
  data: () => ({
    banners: [
      {
        id: 1,
        image: 'banner.png'
      },
      {
         id: 2,
        image: 'banner1.png'
      },
      {
         id: 3,
        image: 'banner2.png'
      },
      {
         id: 4,
        image: 'banner3.png'
      }
    ]
  }),
  computed: {
    getRndInteger() {
      return Math.floor(Math.random() * (4 - 0) ) + 0
    },
    breadcrumbs() {
      return [
        { text: 'Главная', link: '/' },
        {
          text: 'Каталог',
          link: '/catalog'
        },
        ...this.getCategoryBreadCrumbs()
      ]
    },
    isBrand() {
      return this.$attrs.isBrands !== undefined
    },
  },
  methods: {
    ...mapActions('product', [
      'getProducts',
      'getProductsFilters',
      'setProductsProperties',
      'setProductsFilters',
      'resetFilters'
    ]),

    applyFilter() {
      this.filter = false
      this.$refs.catalogProducts.scrollToListTop()
      this.getProductsHandler({
        query: {
          page: this.pageNumber,
        }
      })
    },

    clearFilter() {
      this.$store.dispatch('product/setProductsFilters')
      this.getProductsHandler({
        query: {
          page: this.pageNumber,
        }
      })
    },
    getProductsMethodHandler() {
      this.getProductsHandler()
    },

    getProductsHandler(options) {
      return this.getProducts(
        options
          ? options
          : {
              query: {
                page: this.pageNumber,
              }
            }
      ).then((newUrl) => {
        this.thatFilters = JSON.parse(JSON.stringify(this.PRODUCT_FILTERS))
      })
    },
    paginationHandler(page) {
      let tempPage;
      if (typeof page == 'string') {
        switch (page) {
          case 'back':
            tempPage = this.pageNumber - 1
            break
          case 'forward':
            tempPage = this.pageNumber + 1
            break
        }
      } else {
        tempPage = page;
      }

      this.$refs.catalogProducts.scrollToListTop()

      this.getProductsHandler({
        query: {
          page: tempPage
        }
      })
      .then(() => this.setPageNumber(tempPage))
    },
    async showMore() {
      const products = await this.getProductsHandler({
        query: {
          // ...this.$route.query,
          page: this.pageNumber + 1
          // page: this.pageNumber > 1 ? this.pageNumber : this.pageNumber + 1,
        },
        isAppendproducts: true
      }).then(() => this.setPageNumber(this.pageNumber + 1))
    },
  },
  mixins: [catalogMixin, productsCountPreloadMixin]
}
</script>
