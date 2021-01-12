<template lang="pug">
  .v-catalog__products
    .v-catalog__queries-wrapper(ref="queries")
      .v-catalog__frequently-searching
        h3 Часто ищут:
        .freq-search-container
          .freq-search-item Медная кровля
          .freq-search-item Рулонная изоляция
          .freq-search-item Керамическая черепица
        .v-catalog__frequently-searching__btn_all ПОКАЗАТЬ ЕЩЕ

        //- .freq-list
        //-   span Все запросы
        //-   img(:src="require('@/assets/images/items/arrow-down.svg')")

      .v-catalog__sorting
        .v-catalog__sorting__btn
          button.v-catalog__sorting__btn-filter(@click="$emit('toggle:subcategories', !subcategoriesView); $root.$emit('scroll:block')")
            span Подкатегории
          button.v-catalog__sorting__btn-filter( @click="$emit('toggle:filter', !filterView)" :class="{'disabled': Object.values(filters).length < 1}" :disabled="Object.values(filters).length < 1" )
            span Фильтры
          button.v-catalog__sorting__btn-filter.disabled
            span Часто ищут
        .v-catalog__sorting-wrapper
          h3 Сортировать по:
          select.v-catalog__select(v-model="sortMethodControl")
            option(value="price-down") убыванию цены
            option(value="price-up") возрастанию цены
            option(value="name-up") названию (А-Я)
            option(value="name-down") названию (Я-А)


        .v-catalog__partial-showing
          span Показывать по:
          select.v-catalog__partial-showing-value(v-model="pageLimitControl")
            option(value="15") 15
            option(value="30") 30
            option(value="45") 45
            option(value="60") 60
            img(:src="require('@/assets/images/items/arrow-down-red.svg')")

        .v-catalog__showing-type
          svg(@click="switchComp('vItem')" :class="{'isComp': currentComp == 'vItem'}" width="40" height="40" viewBox="0 0 40 40" fill="#BAB4B4" xmlns="http://www.w3.org/2000/svg")
            path(d="M0 4.51613C0 7.01032 2.02194 9.03226 4.51613 9.03226C7.01032 9.03226 9.03226 7.01032 9.03226 4.51613C9.03226 2.02194 7.01032 0 4.51613 0C2.02194 0 0 2.02194 0 4.51613Z")
            path(d="M15.4844 4.51613C15.4844 7.01032 17.5063 9.03226 20.0005 9.03226C22.4947 9.03226 24.5166 7.01032 24.5166 4.51613C24.5166 2.02194 22.4947 0 20.0005 0C17.5063 0 15.4844 2.02194 15.4844 4.51613Z")
            path(d="M35.4849 0C32.9907 0 30.9688 2.02194 30.9688 4.51613C30.9688 7.01032 32.9907 9.03226 35.4849 9.03226C37.9791 9.03226 40.001 7.01032 40.001 4.51613C40.001 2.02194 37.9791 0 35.4849 0Z")
            path(d="M0 20C0 22.4942 2.02194 24.5161 4.51613 24.5161C7.01032 24.5161 9.03226 22.4942 9.03226 20C9.03226 17.5058 7.01032 15.4839 4.51613 15.4839C2.02194 15.4839 0 17.5058 0 20Z")
            path(d="M15.4844 20C15.4844 22.4942 17.5063 24.5161 20.0005 24.5161C22.4947 24.5161 24.5166 22.4942 24.5166 20C24.5166 17.5058 22.4947 15.4839 20.0005 15.4839C17.5063 15.4839 15.4844 17.5058 15.4844 20Z")
            path(d="M30.9688 20C30.9688 22.4942 32.9907 24.5161 35.4849 24.5161C37.9791 24.5161 40.001 22.4942 40.001 20C40.001 17.5058 37.9791 15.4839 35.4849 15.4839C32.9907 15.4839 30.9688 17.5058 30.9688 20Z")
            path(d="M0 35.4839C0 37.9781 2.02194 40 4.51613 40C7.01032 40 9.03226 37.9781 9.03226 35.4839C9.03226 32.9897 7.01032 30.9678 4.51613 30.9678C2.02194 30.9678 0 32.9897 0 35.4839Z")
            path(d="M15.4844 35.4839C15.4844 37.9781 17.5063 40 20.0005 40C22.4947 40 24.5166 37.9781 24.5166 35.4839C24.5166 32.9897 22.4947 30.9678 20.0005 30.9678C17.5063 30.9678 15.4844 32.9897 15.4844 35.4839Z")
            path(d="M30.9688 35.4839C30.9688 37.9781 32.9907 40 35.4849 40C37.9791 40 40.001 37.9781 40.001 35.4839C40.001 32.9897 37.9791 30.9678 35.4849 30.9678C32.9907 30.9678 30.9688 32.9897 30.9688 35.4839Z")

          svg(@click="switchComp('vItemHorizontal')" :class="{'isComp': currentComp == 'vItemHorizontal'}" width="40" height="40" viewBox="0 0 40 40" fill="#BAB4B4" xmlns="http://www.w3.org/2000/svg")
            path(d="M40 35.4382C40 38.68 35.3448 38.9744 32.103 38.9744H20.1722C16.8805 38.9744 12 38.7299 12 35.4382V35.4382V35.4382C12 32.0185 16.9071 31.7949 20.3268 31.7949H32.0275C35.3191 31.7949 40 32.1465 40 35.4382V35.4382V35.4382Z")
            path(d="M0 35.5001C0 37.9853 2.01472 40.0001 4.5 40.0001V40.0001C6.98528 40.0001 9 37.9853 9 35.5001V35.2693C9 32.784 6.98528 30.7693 4.5 30.7693V30.7693C2.01472 30.7693 0 32.784 0 35.2693V35.5001Z")
            path(d="M40 20.0534C40 23.2953 35.3448 23.5896 32.103 23.5896H20.1722C16.8805 23.5896 12 23.3451 12 20.0534V20.0534V20.0534C12 16.6337 16.9071 16.4102 20.3268 16.4102H32.0275C35.3191 16.4102 40 16.7618 40 20.0534V20.0534V20.0534Z")
            path(d="M0 20.1153C0 22.6006 2.01472 24.6153 4.5 24.6153V24.6153C6.98528 24.6153 9 22.6006 9 20.1153V19.8845C9 17.3992 6.98528 15.3845 4.5 15.3845V15.3845C2.01472 15.3845 0 17.3992 0 19.8845V20.1153Z")
            path(d="M40 4.66887C40 7.91074 35.3448 8.20512 32.103 8.20512H20.1722C16.8805 8.20512 12 7.96058 12 4.66887V4.66887V4.66887C12 1.24917 16.9071 1.02563 20.3268 1.02563H32.0275C35.3191 1.02563 40 1.37724 40 4.66887V4.66887V4.66887Z")
            path(d="M4.5 0C2.01472 0 0 2.01472 0 4.5V4.73077C0 7.21605 2.01472 9.23077 4.5 9.23077V9.23077C6.98528 9.23077 9 7.21605 9 4.73077V4.5C9 2.01472 6.98528 0 4.5 0V0Z")

          svg(@click="switchComp('vItemHorizontalnoPic')" :class="{'isComp': currentComp == 'vItemHorizontalnoPic'}" width="40" height="40" viewBox="0 0 40 40" fill="#BAB4B4" xmlns="http://www.w3.org/2000/svg")
            path(d="M37.2414 7.61176H2.75862C1.24138 7.61176 0 5.89911 0 3.80588C0 1.71265 1.24138 0 2.75862 0H37.2414C38.7586 0 40 1.71265 40 3.80588C40 5.89911 38.7586 7.61176 37.2414 7.61176Z")
            path(d="M37.2414 39.9999H2.75862C1.24138 39.9999 0 38.2873 0 36.1941C0 34.1008 1.24138 32.3882 2.75862 32.3882H37.2414C38.7586 32.3882 40 34.1008 40 36.1941C40 38.2873 38.7586 39.9999 37.2414 39.9999Z")
            path(d="M37.2414 23.8059H2.75862C1.24138 23.8059 0 22.0932 0 20C0 17.9067 1.24138 16.1941 2.75862 16.1941H37.2414C38.7586 16.1941 40 17.9067 40 20C40 22.0932 38.7586 23.8059 37.2414 23.8059Z")
    .v-catalog__items-wrapper(ref="products")
      .v-catalog__items-wrapper__for_card
        .v-catalog__items-list
          vItem(:is="currentComp"
            v-for="item in GET_PRODUCTS"
            :key="item.id"
            :item="item"
          )
      slot(name="pagination" v-if="CATEGORY.count > 0")
</template>

<script>
import { mapGetters } from 'vuex'

import vItem from '@/components/Item.vue'
import vItemHorizontal from '@/components/itemHorizontal'
import vItemHorizontalnoPic from '@/components/itemHorizontalnoPic'
import imgPathMixin from '@/components/mixins/imgPath';

export default {
  props: {
    subcategoriesView: {
      type: Boolean
    },
    filters: {
      type: Object
    },
    filterView: {
      type: Boolean
    },
  },
  data: () => ({
    currentComp: 'vItem',
  }),
  components: {
    vItem,
    vItemHorizontal,
    vItemHorizontalnoPic
  },
  computed: {
    ...mapGetters({
      sort: 'product/GET_SORT',
      limit: 'product/GET_LIMIT',
      category: 'category/GET_CURRENT_CATEGORY',
    }),
    pageLimitControl: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('change:product-page-count', val)
      }
    },
    sortMethodControl: {
      get() {
        return this.sort
      },
      set(val) {
        this.$emit('change:sort-method', val)
      }
    },
    ...mapGetters({
      CATEGORY: 'category/GET_CURRENT_CATEGORY',
      GET_PRODUCTS: 'product/GET_PRODUCTS'
    })
  },
  mounted() {
    this.scrollToListTop(true)
  },
  methods: {
    switchComp(comp) {
      this.currentComp = comp
    },
    scrollToListTop(mounted) {
      if (mounted && window.scrollY > 0) return
      const productsList = this.$refs.products
      const queriesWrapper = this.$refs.queries
      // productsList.scrollIntoView({block: "center", behavior: "smooth"})
      // const headerHeight = 1
      const position = queriesWrapper.getBoundingClientRect().top + window.scrollY
      const offsetPosition = position
      window.scrollTo({top: offsetPosition, behavior: 'smooth'})
    },
  },
  mixins: [imgPathMixin]
}
</script>
