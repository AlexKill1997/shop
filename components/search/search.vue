<template lang="pug">
  .search__wrapper
    form.search__field(@submit.prevent="addtoMainSearch" v-click-outside="disabledSearchForComp")
      button.v-subheader__search-button(type="text" name="search-query" )
        img.v-subheader__search-button-img(src="~@/assets/images/icons/search.svg")
      input.v-subheader__search-input.show(
        type='text',
        placeholder='Введите наименование товара или артикул',
        v-model.trim='searchValid'
      )
      img.v-popup-login__closeSearch(
        v-if="isSearchRequestComplete"
        :src="require('@/assets/images/icons/close_mark.svg')"
        title="Закрыть окно"
        alt="Закрыть"
        @click="mainResetResults"
        )
      template(v-if="isSearchRequestComplete&&searchOppComp" )
        div.search__result_category(v-if="searchCategory.length > 0" )
          .category_list Категории:
          div.search__result_category_inner(v-for="categoryItem of searchCategory")
            nuxt-link(:to="getRoute(categoryItem._id)")
              searchByCategory(:category="categoryItem" :key="categoryItem.cSlug")

        div.search__result_products(v-else-if="searchProducts.length > 0" )
          .product_list Товары:
          div.search__result_products_inner(v-for="productItem of searchProducts")
            nuxt-link(:to='{ name: "products", params: { id: productItem.slug, region: REGION.value } }')
              searchByProduct(:product="productItem" :key="productItem.article")

        div(v-else).search__result_empty Ничего не найдено


    //- эта часть выдрана из header и вставлена сюда. все стили тянутся из header
    form.v-subheader__search.mobile(@submit.prevent="addtoMainSearch" v-click-outside="ableLogo")
      button.v-subheader__search-button(type="text" name="search-query"  @click="disabledLogo" )
        img.v-subheader__search-button-img(src="~@/assets/images/icons/search.svg")
      input.v-subheader__search-input.show(
        @click="disabledLogo"
        type="text"
        placeholder="Введите наименование товара или артикул" ref="email"
        v-model.trim='searchValid'
          )
      template(v-if="isSearchRequestComplete && searchOpp")
        div.search__result_category(v-if="searchCategory.length > 0" )
          .category_list Категории:
          div.search__result_category_inner(v-for="categoryItem of searchCategory")
            nuxt-link(:to="getRoute(categoryItem._id)")
              searchByCategory(:category="categoryItem" :key="categoryItem.cSlug")

        div.search__result_products(v-else-if="searchProducts.length > 0")
          .product_list Товары:
          div.search__result_products_inner(v-for="productItem of searchProducts")
            nuxt-link(:to='{ name: "products", params: { id: productItem.slug, region: REGION.value, item: productItem } }')
              searchByProduct(:product="productItem" :key="productItem.article")

        div(v-else).search__result_empty Ничего не найдено

</template>
<script>
import {mapMutations, mapGetters, mapActions} from 'vuex'
import searchByCategory from '@/components/search/mainSearch/searchBycategory'
import searchByProduct from '@/components/search/mainSearch/searchByProduct'
import ClickOutside from 'vue-click-outside'

let timer = null

export default {
  name: 'search',
  components: {
    searchByCategory,
    searchByProduct
  },
  data: () => ({
    mainPrevent: false,
    searchOpp: true,
    searchOppComp: true
  }),
  computed: {
    ...mapGetters({
      searchValue: 'search/GET_SEARCH_VALUE',
      searchCategory: 'search/GET_SEARCH_RESULT_CATEGORY',
      searchProducts: 'search/GET_SEARCH_RESULT_PRODUCTS',
      isSearchRequestComplete: 'search/GET_SEARCH_REQUEST_COMPLETE',
      REGION: 'GET_CURRENT_CITY'
    }),
    searchValid: {
      get() {
        return this.searchValue
      },
      set(val) {
        clearTimeout(timer)
        this.mainResetResults()
        if(val == '') return

        this.mainsearchValue(val)
        this.addtoMainSearch()
      }
    }
  },
  methods: {
    ...mapMutations({
      mainsearchValue: 'search/SET_SEARCH_MAIN_VALUE',
      mainResetResults: 'search/RESET_MAIN_SEARCH'
    }),
    ...mapActions({
      getSearch: 'search/getSearchResponse'
    }),
    disabledSearchForComp(){
      this.searchOppComp = false
    },
    disabledLogo(){
      this.searchOpp=true
      this.$emit('disabledLogo')
    },
    ableLogo(){
      this.searchOpp=false
      this.$emit('abledLogo')
    },
    addtoMainSearch() {
      this.searchOppComp = true
      if(this.mainPrevent) return
      timer = setTimeout(() => {
        this.getSearch()
      }, 500)
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<style lang="sass">
@import '@/layouts/mixins.sass'
.v-subheader__search.mobile
  display: none
  @include phones
    position: relative
    display: flex
.category_list, .product_list
  font-size: 18px
.search__wrapper
  width: 100%
.search__field
  width: 100%
  @include phones
    display: none
  .v-popup-login__closeSearch
    position: absolute
    top: 16px
    right: 54px
    cursor: pointer
.search__result_category,
.search__result_products
  background: white
  position: absolute
  top: 46px
  left: 0
  right: 0
  padding: 10px
  border: 2px solid #f6f6f6
  margin-top: 10px
  box-shadow: 0 0 10px black
  z-index: 10
  @media screen and(max-width: 360px)
    width: 95vw
  &_inner
    margin: 5px 0 0 0
    color: $red
    background-color: #f6f6f6
    padding: 3px
    a
      text-decoration: none
      color: black
.search__result_empty
  color: $red
  margin: 3px 0 0 27px
  position: absolute
  width: 100%


form.v-subheader__search.mobile
  input.v-subheader__search-input.show
    -webkit-appearance: none
    border-radius: 0

.search__result_products
  z-index: 100
  @include phones
    margin-right: 5px


.search__result_category
  @include phones
    margin-right: 5px
</style>
