import { mapGetters, mapMutations } from 'vuex'
import { transliterate as tr, slugify } from 'transliteration'

import Vue from 'vue'

import vBreadcrumbs from '@/components/breadcrumbs.vue'
import vCta from '@/components/cta.vue'
import vFavourite from '@/pages/favorites.vue'

import Pagination from '@/components/partials/pagination.vue'
import MobileFilters from '@/components/catalog/mobile-filters.vue'
import MainFilters from '@/components/catalog/main-filters.vue'
import Categories from '@/components/catalog/categories.vue'
import MobileCategories from '@/components/catalog/mobile-categories.vue'
import CategoriesCards from '@/components/catalog/categories/CardsList.vue'
import CatalogProducts from '@/components/catalog/products.vue'

import imgPath from '@/components/mixins/imgPath'

import SeoProduct from '@/components/catalog/seo.vue'

export default Vue.extend({
  mixins: [imgPath],
  components: {
    vBreadcrumbs,
    vCta,
    vFavourite,
    //
    Pagination,
    MobileFilters,
    MainFilters,
    Categories,
    MobileCategories,
    CategoriesCards,
    CatalogProducts,
    
    SeoProduct
  },
  data: () => ({
    viceversa: false,
    isTurn1: true,
    isTurn2: true,
    selected: null,
    route: {},
    turn: 'turn',
    show: false,
    filter: false,
    mobileVersion: false,
    subcategories: false,
  }),
  computed: {
    ...mapGetters('product', [
      'PRODUCT_PROPERTIES',
      'PRODUCT_FILTERS',
      'GET_PRODUCTS'
    ]),
    ...mapGetters({
      CATEGORY: 'category/GET_CURRENT_CATEGORY',
      // catalogConfig: 'product/GET_CATALOG_CONFIG'
      pageNumber: 'product/GET_PAGE_NUMBER',
      limit: "product/GET_LIMIT",
      sort: "product/GET_SORT"
    }),
    ...mapGetters(['GET_MENU_ROUTES']),
    ...mapGetters({
      getCategoryFromRoutes: "GET_CURRENT_CATEGORY_MENU",
    }),
    
    pagesCount() {
      const count = Math.ceil(this.CATEGORY.count / this.limit)
      const array = []

      for (let i = 0; i < count; i++) {
        array.push(i + 1)
      }

      return array
    },
  },

  methods: {
    ...mapMutations({
      setSort: 'product/SET_SORT',
      setLimit: 'product/SET_LIMIT',
      setPageNumber: 'product/SET_PAGE_NUMBER'
    }),

    trying(event) {},
    sl(value) {
      return slugify(tr(value))
    },
    countProduct() {
      return this.CATEGORY.count
    },
    getCategoryBreadCrumbs(forceLink) {
      const breadcrumbs = []
      const category = this.CATEGORY ? this.getCategory(this.CATEGORY._id) : null
      const parent = category ? this.getCategory(category.parent_id) : null
      const grandParent = parent ? this.getCategory(parent.parent_id) : null

      if (grandParent) {
        breadcrumbs.push({
          text: grandParent.categoryName,
          link: grandParent.url
        })
      }

      if (parent) {
        breadcrumbs.push({
          text: parent.categoryName,
          link: parent.url
        })
      }

      if (category) {
        const lastItem = forceLink ?
          {
            text: category.categoryName,
            link: parent.url
          } :
          {
            text: category.categoryName
          }
        
        breadcrumbs.push(lastItem)        
      }

      return breadcrumbs
    },
    
    sortMethodHandler(value) {
      this.setSort(value)
      this.getProductsMethodHandler()
    },
    changeProductPageHandler(value) {
      this.setLimit(value)
      this.getProductsMethodHandler()
    }
  },
  created() {
    this.pages = this.$route.query.page || 1
    if (this.mobileVersion) {
      this.setLimit("5")
    } else {
      this.setLimit(this.$route.query.limit || "15")
    }
    this.setPageNumber(+this.$route.query.page || 1)
  },
})