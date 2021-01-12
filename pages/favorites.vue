<template lang="pug">
    #v-favotites.v-favorites
      vBreadcrumbs(v-if="isPage!=='account'" :breadcrumbs="breadcrumbs")
      h1.v-favorites__heading Избранное:
      //- .v-favorites__more
      //-   button.v-favorites__more--text показать еще
      .v-favorites__empty_header(v-if="!favoritesList.length > 0")
        span.v-favorites__empty Список избранного пуст!

        nuxt-link.v-favorites__empty-link(to='/catalog' ) Перейти к выбору товаров
        nuxt-link.v-favorites__empty-link.mob(to='/' ) Перейти к выбору товаров
      itemFavorites(v-for="item in favoritesList" :key="item.id" :item="item" @change="selectMethodHandler({ action: $event, id: item.article })")
      .v-favorites__total(v-if="favoritesList.length > 0")
        .v-favorites__container
          p.v-favorites__value Итого:
            strong.ruble &nbsp;{{favoritesSummary}} &#x20bd;
          button.v-favorites__addToCart--btn( @click="addFavoritesToCart") {{productLengthCounter(selectedItems.length)}}

</template>

<script>
import itemFavorites from '@/components/itemFavoritesList'
import vBreadcrumbs from '@/components/breadcrumbs'
import addToCart from '@/components/mixins/addToCart'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    showFavorite: false
  }),
  computed: {
    ...mapGetters({
        favoritesList: 'favorites/GET_FAVORITES',
        selectedItems: 'favorites/GET_SELECTED',
        favoritesSummary: 'favorites/GET_FAVORITES_SUMMARY',
        isPage: 'GET_PAGE',
        isInCart: 'cart/IS_IN_CART'
    }),
    breadcrumbs() {
      return [
        {
          text: 'Главная',
          link: "/"
        },
        {
          text: 'Избранное'
        }
      ]
    },
    cartFilteredItems() {
      return this.favoritesList.filter(item => this.isInCart(item))
    }
  },
  methods: {
    ...mapMutations('favorites', ['ADD_TO_SELECTED', 'REMOVE_SELECTED', 'RESET_SELECTED']),
    selectMethodHandler({action, id}) {
      switch(action) {
        case "check":
          this.ADD_TO_SELECTED(id)
          break;
        case "uncheck":
          this.REMOVE_SELECTED(id)
          break;
      }
    },
    productLengthCounter(length) {
      const str = `${length}`
      if (str.match(/.*1$/)) return `${str} товар в корзину`
      else if (str.match(/.*(2|3|4)$/)) return `${str} товара в корзину`
      else if (str.match(/.*(5|6|7|8|9|0)$/) && !str.match(/0/)) return `${str} товаров в корзину`
      else return `Все товары в корзину`
    },

    addFavoritesToCart() {
      const filteredSelected = this.selectedItems.filter(item => !this.isInCart(item))
      const filteredFavorites = this.favoritesList.filter(item => !this.isInCart(item))
      if(!filteredSelected.length){
        this.concatCart(filteredFavorites)
      } else {
        this.concatCart(filteredSelected)
      }
      this.RESET_SELECTED()
    }
  },
  name: 'favorites',
  components: {
    itemFavorites,
    vBreadcrumbs
  },
  mixins: [ addToCart ]
}
</script>
<style lang="sass">
@import '../layouts/mixins.sass'
.v-favorites
  @include phones
    display: flex
    flex-direction: column-reverse
    width: 100%
    margin-top: 15px

  &__heading
    font-size: 18px
    margin: 30px 0 30px 80px
    font-weight: bold
    grid-area: heading
    @include phones
      display: none
      margin: 30px 0 30px 30px
  &__empty_header
    text-align: center
    margin: 137px 0
    display: flex
    flex-direction: column
    align-items: center
  &__empty
    color: $red
    font-size: 20px
    border: 2px dashed red
    padding: 10px
    width: fit-content
    text-align: center
  &__empty-link
    font-size: 16px
    margin-top: 10px
    border-bottom: 2px dashed black
    text-decoration: none
    color: black
    cursor: pointer
    @include phones
      display: none
  &__empty-link.mob
    display: none
    @include phones
      display: block
  &__total
    display: flex
    justify-content: center
    align-items: center
    height: 38px
    grid-area: total
    margin-bottom: 15px
  &__container
    display: flex
    align-items: center
    justify-content: flex-end
    width: 100%
    height: 38px
    background-color: white
    max-width: 1014px
    border-top: 2px solid #BAB4B4
    border-bottom: 2px solid #BAB4B4
    border-left: 2px solid #BAB4B4
    @media screen and (max-width: 1010px)
      border-left: unset

  &__container.mobile
    display: none
    @include phones
      display: flex
      margin-bottom: 20px
  &__value
    margin: 0 10px 0 0
    font-size: 16px
    line-height: 19px
    letter-spacing: 0.07em
    text-align: center
    margin-left: 10px
    font-weight: bold
    strong
      font-weight: 800
      color: $red
      font-size: 20px

    @include phones
      height: 100%
      width: 50%
      display: flex
      justify-content: center
      align-items: center
      line-height: normal
      margin: 0
    span
      font-weight: bold
      font-size: 18px
      @include phones
        font-size: 16px
  &__addToCart--btn
    display: flex
    align-items: center
    justify-content: center
    width: 259px
    height: 38px
    background: $red
    outline: none
    border: none
    cursor: pointer
    padding: 10px 24px
    color: #fff
    border: 2px solid $red
    transition: .2s
    text-align: center

    @include phones
      padding: 0
      width: 50%
      height: 100%
      font-size: calc(13px + (18 - 13) * ((100vw - 320px) / (1920 - 320)))
    &:hover
      background: #fff
      color: $red
  &__more
    display: none
    @include phones
      display: flex
      justify-content: center
      margin-bottom: 20px
    &--text
      display: flex
      align-items: center
      font-weight: bold
      font-size: 16px
      line-height: 19px
      letter-spacing: 0.07em
      padding: 10px 15px
      color: $red
      border: 2px solid white
      transition: .2s
      background: #fff
      outline: none
      @include phones
        padding: 5px 0 0 0
      &:hover
        background: $red
        color: white
        border: 2px solid $red
        @include phones
          color: $red
          background: #fff
          border: 2px solid white

.v-favorites__wrapper
  @include phones
    height: 65vh
    overflow: auto
    margin-bottom: 80px


</style>
