<template lang="pug">
  .wrapper(v-click-outside="show")
    form.search__article(@click="searchArticle"  :class="{ 'searchSmall': isSmallSearch }")
      input( type="text" name="searcharticle" maxlength="5" placeholder="Введите номер артикула" v-model="inputValid" ref="input" autocomplete="off" autofocus)
    template(v-if="isRequestComplete")
      div.article__result(v-if="products.length > 0 && showSearchByArticle")
        div.article__result_inner(v-for="item of products" v-if="!isInCart(item)")
          vCardSearchArticleSmall(v-if="isSmallSearch" :item="item" :key="item.article" @click.native="clickHandler($event, item)")
          vCardSearchArticle(v-if :item="item" :key="item.article" @click.native="clickHandler($event, item)")
      div(v-else).article__result-empty Ничего не найдено
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import vCardSearchArticleSmall from '@/components/search/search-article/vCardSearchArticleSmall';
import vCardSearchArticle from '@/components/search/search-article/cardSearchArticle';
import ClickOutside from 'vue-click-outside'
export default {
  name: 'Searcharticle',
  props: {
    isSmallSearch: {
      type: Boolean,
    }
  },
  data: () => ({
    prevent: false,
    showSearchByArticle: true
  }),
  components: {
    vCardSearchArticle,
    vCardSearchArticleSmall
  },
  computed: {
    ...mapGetters({
      products: "search/GET_ARTICLE_SEARCH_RESULT",
      isRequestComplete: "search/GET_REQUEST_COMPLETE",
      isInCart: "cart/IS_IN_CART",
      articleSearch: "search/GET_ARTICLE_SEARCH",
      REGION: "GET_CURRENT_CITY"
    }),
    inputValid: {
      get() {
        return this.articleSearch
      },
      set(value){
        if(value == '') return this.resetResults()
        if(value.match(/\D/g)) this.prevent = true
        else this.prevent = false
        value = value.replace(/\D/g, '')
        this.$refs.input.value = value
        this.addtoSearch(value)
      }
    }
  },
  methods: {
    ...mapMutations({
      searchArticle:'search/SET_SEARCH_VALUE',
      resetResults: 'search/RESET_SEARCH_ARTICLE',
      addToCart: "cart/ADD_TO_CART"
    }),

    ...mapActions({
      getArticle: 'search/getArticleResponse'
    }),

    addtoSearch(article) {
      if(this.prevent) return
      this.getArticle(article)
    },
    searchArticle(){
      this.showSearchByArticle=true
    },
    show(){
      this.showSearchByArticle=false
    },
    clickHandler(e, item) {
      e.preventDefault()
      this.addToCart({ ...item, counter: 1, region: this.REGION.value })
      this.resetResults()
    }
  },
  directives: {
    ClickOutside
  }
}
</script>
<style lang="sass">
@import '@/layouts/mixins.sass'

.search__article
  input
    width: 100% !important
    color: #000
    font-weight: bold
    border-radius: 0
    -webkit-appearance: none
    border: 2px solid #bab4b4
  input::placeholder
    color: $red
    @include phones
      text-align: center
  &.searchSmall + .article__result
    position: absolute
    z-index: 2
    left: 0
    width: calc(100% + 4px)
    left: -2px
    padding: 0
    background-color: #fff
    @include phones
      margin-top: 13px
      width: 100%
      left: 0
    @media screen and(max-width: 384px)
      margin-top: 20px
    .cardSearchArticleSmall__container
      &.article-value
        font-size: 14px
        font-weight: bold
      &__heading--title
        font-size: 14px
        color: #000
  &.searchSmall
    input
      outline: none
      border: none
      font-size: 16px
      color: $red
    input::placeholder
      font-size: 14px
.article__result
  margin-top: 9px
  &-empty
    color: $red

.v-popup__article_content > div > div > div > div:nth-child(1)
  border-top: 2px solid #bab4b4
</style>
