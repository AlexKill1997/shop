<template lang="pug">
  #v-cart
    vBreadcrumbs(:breadcrumbs="breadcrumbs")
    .v-cart
      h1.v-cart__heading Корзина
      p.cart__empty_header(v-if="!cartProducts.length > 0")
        span.v-cart__empty(to='/catalog' ) Корзина Пуста, добавьте товары!
      .v-cart__content
        .v-cart__table
          .v-cart__table-buttons(:class="{'displayflex': cartProducts.length < 1}")
            template(v-if="!cartIsEmpty"  )
              .table-button__text(v-if="cartProducts.length < 1" :class="{'notshowbutton': isArticlepopupVisible}" ) Соберите заказ по номеру артикула:
              .table-button__add(:class="{ 'table-button__add--resize': cartProducts.length > 0, 'notshowbutton': isArticlepopupVisible, 'red-btn': cartProducts.length < 1 }"      )
                //- img.table-button__add-icon(:src="require('../assets/images/cart/add.svg')" @click="closeArticleField" v-if="isButtonVisible")
                span(v-if="cartProducts.length < 1 && !isArticleInput" @click="showfieldForArticle") Собрать заказ
                span(v-if="cartProducts.length > 0 && !isArticleInput" @click="showfieldForArticle") Соберите заказ по номеру артикула
                SearchArticle.searchArticleInput(v-if="isArticleInput"   :isSmallSearch="true")
              .table-button__clear(@click="clearCart" v-if="cartProducts.length > 0")
                img.table-button__clear-icon(:src="require('@/assets/images/cart/clear.svg')")
                span Очистить корзину

          template(v-if="cartProducts.length > 0")
            .v-cart__table-wrapper
              div.v-cart__table-content
                div.v-cart__table-head
                  div
                    span Фото:
                  div
                    span Наименование:
                  div
                    span Артикул:
                  div
                    span Цена:
                  div
                    span Количество:
                  div
                    span Итого:
                  div
                div.v-cart__table-body
                  vItemCart(
                    @deleteItem="deleteHandler"
                    v-for="item in cartProducts"
                    :key="item.id"
                    :item="item"
                    )

          vArticlePopup(
              v-if="isArticlepopupVisible"
              @close="closeArticlePopup"
              )

      .v-cart__payment-wrapper(v-if="cartProducts.length > 0")
        .v-cart__summary
          .v-cart__summary__text
            h6.v-cart__summary-heading Итого
            span.v-cart__summary-value.ruble {{ cartSummary }} &#x20bd;
          .v-cart__summary__pic
            img(src="@/assets/images/cart/summary-bg.png")
        .v-cart__credit-container
          .v-cart__credit
            span Купить в кредит
            span.v-cart__credit-note(v-tooltip.right-start="{content: 'Рассрочка: сумма от 3 тыс рублей до 300 тыс. рублей При кредите можем согласовать макс сумму до 1 млн рублей', offset: 8}")
              span *
              span Примечание
        nuxt-link(to="/cart/checkout" no-prefetch class="v-cart__checkout")
          .v-cart__buy
            span Оформить заказ

        .v-cart__cardtypes
          .v-cart__cardtypes-heading Мы принимаем к оплате:
          .v-cart__cardtypes-images
            img(:src="require('@/assets/images/cart/cardtypes.jpg')")
      div.v-cart__credit__after(v-if="cartProducts.length > 0")
        span Рассрочка: сумма от
          strong  3 тыс рублей
        span  до
          strong  300 тыс. рублей
        br
        span При кредите можем согласовать макс сумму до
          strong 1 млн рублей
      .v-cart__mayneed
        .v-cart__mayneed-heading
          p Товары, которые могут вам пригодиться:
          .v-cart__mayneed-heading__background-icon
            img(src="@/assets/images/divider.png")
        .v-cart__mayneed-list
          .v-cart__mayneed-item(v-for="item in additionalProducts.salesItems")
            vItem(
                :key="item.id"
                :item="item"
              )
    vCta
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import vBreadcrumbs from '@/components/breadcrumbs'
import vCta from '@/components/cta'
import vItem from '@/components/Item'
import vItemCart from '@/components/ItemCart'
import vArticlePopup from '@/components/popup/v-popup-article'
import SearchArticle from '@/components/search/search-article/searchbyarticle'

export default {
  name: 'Cart',
  components: {
    vBreadcrumbs,
    vCta,
    vItem,
    vItemCart,
    vArticlePopup,
    SearchArticle
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Главная',
          link: "/"
        },
        {
          text: 'Корзина'
        }
      ],
      isArticlepopupVisible: false,
      isArticleInput: false,
      cartIsEmpty: false
    }
  },

  computed: {
    ...mapGetters({
      additionalProducts: 'product/GET_ADDITIONAL_PRODUCTS',
      cartProducts: 'cart/GET_PRODUCTS_FROM_CART',
      cartSummary: 'cart/GET_AMOUNT'
    }),
    isButtonVisible() {
      return this.cartProducts.length > 0
    }
  },

  methods: {
    ...mapMutations({
      resetSearchResults: 'search/RESET_SEARCH_ARTICLE',
    }),
    // toFocus(){
    //   this.$nextTick(() => {
    //     this.$parent.input.focus()
    // });
    // },
    clearCart() {
      this.$store.dispatch('cart/clearCart')
      this.isArticleInput = false
    },
    showfieldForArticle() {
      if (this.cartProducts.length > 0){
        this.isArticleInput = !this.isArticleInput
      }
      else{
         this.isArticlepopupVisible = !this.isArticlepopupVisible

      }
    },

    closeArticlePopup() {
      this.isArticlepopupVisible = false
      this.showfieldForArticleVisible=!this.showfieldForArticleVisible
    },

    closeArticleField() {
      this.resetSearchResults()
      this.isArticleInput = !this.isArticleInput
    },

    deleteHandler() {
      if (this.cartProducts.length < 1){
        this.isArticleInput = false

      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/layouts/mixins.sass'
.v-cart
  display: flex
  padding: 0px 45px
  flex-direction: column
  @include laptop
    padding: 0px 25px
  @include tablets
    padding: 0 15px
  @include phones
    padding: 0 5px
  @media screen and(max-width: 383px)
    padding: 0
  &__empty
    color: $red
    font-size: 20px
    padding: 10px
    border: 2px dashed red
    text-decoration: none
    @media screen and(max-width: 380px)
      font-size: 18px
      padding: 5px
  &__content
    max-width: 1201px
    margin: auto
    @media screen and (max-width: 1210px)
      min-width: 100%
  &__heading
    font-size: 24px
    font-weight: 700
    letter-spacing: .07em
    @include phones
      display: none
  .cart__empty_header
    text-align: center
    margin: 60px 0 60px 0

  &__table-wrapper
    display: flex

  &__table-buttons
    display: flex
    flex-direction: row
    margin-bottom: 14px
    @media screen and(max-width: 1210px)
      justify-content: center
    @include phones
      margin-top: 10px
      justify-content: center
      position: relative
    @media screen and(max-width: 383px)
      margin: 10px 5px
    .table-button__add, .table-button__clear
      display: flex
      align-items: center
      border: 2px solid $gray-4
      font-size: 14px
      letter-spacing: .07em
      cursor: pointer
      font-weight: bold
      &-icon
        margin-right: 7px
        @media screen and(max-width: 350px)
          margin-right: 3px

    .table-button__add
      padding: 5px 10px 5px 5px
      color: $red
      font-weight: bold
      position: relative

      @include phones
        position: static
        // color: white
        // background-color: $red
        padding: 5px
      @media screen and(max-width: 384px)
        height: 60px
      &--resize
        width: 70%
        @include phones
          width: 60%

      .searchArticleInput
        width: 100%
        outline-color: $red
        height: 20px
        border: none
        @include phones
          width: 100%
          font-size: 16px
    .table-search__article
      &_field
        border: 2px solid black
        /* padding: 13px 27px; */
        outline-color: $red
        width: 100%
        height: 25px



    .table-button__clear
      padding: 5px 7px 5px 5px
      color: $gray-4
      margin-left: 105px
      @include phones
        margin-left: 0
        width: 35%
        margin-left: 5%
        padding: 5px
      @media screen and(max-width: 350px)
        padding: 2px
  &__table-content
    border-collapse: collapse
    width: 100%

  &__table-head
    display: flex
    text-align: center
    border: 2px solid $yellow
    // background-color: $gray-1
    margin-bottom: 30px
    margin-right: 54px
    padding-left: 69px
    @media screen and (max-width: 1180px)
      display: none

    div
      text-align: center
      padding: 9px 0px
      text-transform: uppercase
      font-size: 14px
      font-weight: 700
      letter-spacing: .07em
      span
        margin: 0 auto
    div:first-child

    div:nth-child(2)
      margin-left: 120px
    div:nth-child(3)
      margin-left: 105px
    div:nth-child(4)
      margin-left: 65px
    div:nth-child(5)
      margin-left: 120px
    div:nth-child(6)
      margin-left: 120px
  &__table-body

    &:before
      content: '@'
      display: block
      line-height: 29px
      text-indent: -99999px
      @include phones
        display: none

  &__info
    margin-left: 78px

    &-heading
      margin: 0px
      padding: 9px
      border: 2px solid $yellow
      background-color: $gray-1
      text-transform: uppercase
      font-size: 14px
      font-weight: 700
      letter-spacing: .07em
      text-align: center
      width: 500px

    &-content
      padding: 44px 24px
      border: 2px solid $gray-4
      background-color: $gray-1
      margin-top: 30px

    &-subheading
      font-size: 18px
      font-weight: 700
      letter-spacing: .07em
      text-transform: uppercase

    &-list
      list-style: none
      padding-left: 0px
      margin-top: 45px

    &-item:not(:last-child)
      margin-bottom: 30px

    &-item-title
      font-size: 16px
      font-weight: 400
      line-height: 19px
      letter-spacing: .07em

    &-item-value
      font-size: 16px
      font-weight: 700
      line-height: 19px
      letter-spacing: .07em
      color: $red

  &__payment-wrapper
    display: grid
    row-gap: 15px
    // column-gap: 45px
    grid-template-columns: 220px 340px 230px 230px 60px
    grid-template-rows: 100px 65px
    grid-template-areas: 'cardtypes . . summary .' 'cardtypes . credit checkout .'
    max-width: 1200px
    margin: 30px auto
    grid-column-gap: 16px
    @media screen and (max-width: 1210px)
      max-width: 700px
      grid-template-columns: 1fr 1.5fr 1.5fr 1.5fr 1.5fr
      column-gap: 15px
      grid-template-areas: 'cardtypes . summary summary summary' 'cardtypes credit credit checkout checkout'
    @media screen and (max-width: 720px)
      grid-template-rows: 130px 75px
      column-gap: 0px
      grid-template-columns: repeat(5, 1fr)
      grid-template-areas: 'cardtypes . summary summary summary' 'credit credit checkout checkout checkout'
    @include phones
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      margin-bottom: 0
      padding: 0 5px
    @media screen and (max-width: 350px)
      flex-direction: column

  &__summary
    width: 235px
    height: 100px
    display: flex
    background-image: url('../../assets/images/cart/summary-bg.png')
    background-size: contain
    background-position: center
    background-repeat: no-repeat
    justify-content: center
    align-items: center
    flex-direction: column
    grid-area: summary
    padding-right: 50px
    @media screen and(max-width: 550px)
      width: 194px
    @include phones
      background-image: none
      position: relative
      width: 200px
      order: 2
    @media screen and (max-width: 350px)
      margin-left: 50px
      height: 82px
      width: 200px
    &-heading, &-value
      font-size: 20px
      line-height: 21px
      margin: 0px
      text-align: center
      letter-spacing: .07em
      color: white
      font-weight: 700

    &__pic
      display: none
      @include phones
        display: block
        position: absolute
        height: 66px
        z-index: -1
        left: 0
      img
        width: 100%
        height: 100%
    &__text
      @include phones
        position: absolute
  &__checkout
    grid-area: checkout
    text-decoration: none
    @media screen and (max-width: 720px)
      justify-self: end
    @include phones
      display: flex
      justify-content: center
      order: 4
  &__credit, &__buy
    // margin-top: 18px
    display: inline-block
    text-transform: uppercase
    font-size: 16px
    line-height: 21px
    padding: 14px 30px
    font-weight: 700
    cursor: pointer
    background-color: $red
    color: white
    @media screen and (max-width: 720px)
      padding: 20px 21px
    @media screen and (max-width: 450px)
      padding: 15px
    @include phones
      padding: 10px
      font-size: 14px

  &__buy
    background-color: $red
    color: white
  &__credit
    // background-color: white
    // border: 2px solid $yellow
    &-container
      position: relative
      grid-area: credit
      @include phones
        order: 3
        justify-content: center
        display: flex

    &-note
      position: absolute
      left: 0px
      top: 70px
      color: black
      font-size: 12px
      font-weight: 300
      font-style: normal
      line-height: 14px
      text-transform: capitalize
      text-align: center
      @include phones
        display: none


  &__cardtypes
    display: flex
    flex-direction: column
    grid-area: cardtypes
    justify-content: flex-end
    order: 0
    @include phones
      justify-content: flex-start
    @media screen and (max-width: 350px)
      align-items: center
    &-heading
      font-size: 14px
      font-weight: 700
      line-height: 16px
      margin-bottom: 10px
      @media screen and (max-width: 720px)
        display: none
    &-images
      height: 141px
      @include phones
        height: 88px
        width: 131px
        order: 1
        margin-right: 10px
      img
        @include phones
          width: 100%

  &__mayneed
    margin-top: 92px
    background-color: $gray-1
    border: 2px solid $gray-4
    padding: 15px 0
    margin-bottom: 30px
    @include phones
      display: none

    &-heading
      font-size: 20px
      line-height: 21px
      font-weight: 700
      text-transform: uppercase
      letter-spacing: .07em
      margin-bottom: 20px
      z-index: 2
      position: relative
      padding-left: 15px
      color: white
      margin-right: 40px
      p
        padding: 10px 0 0 40px
      &__background-icon
        position: absolute
        height: 40px
        top: 0
        z-index: -1
        img
          width: 100%
          height: 100%
    &-list
      display: flex
      flex-wrap: wrap
      justify-content: center

.v-cart__credit__after
  display: none
  @include phones
    margin-top: 5px
    width: 100%
    display: block
    font-size: 10px
    padding-left: 5px
    margin-bottom: 20px
  @media screen and (max-width: 350px)
    text-align: center


.notshowbutton
  display: none !important

span.v-cart__credit-note.has-tooltip
  span:nth-child(1)
    color: $red

.red-btn
  color: white !important
  background-color: $red !important
  border: none !important
  padding: 10px 42px !important
  font-size: 16px !important
  text-align: center !important
  justify-content: center !important
  @include phones
    width: 358.09px
    font-size: 14px !important
    height: auto !important
  @media screen and(max-width: 380px)
    width: 314.69px
  @media screen and(max-width: 350px)
    width: 310.69px

.displayflex
  flex-direction: column
  align-items: center

.table-button__text
  text-align: center
  margin-bottom: 10px

.v-cart__empty.mob
  display: none
  @include phones
    display: block
    padding: 10px !important
    border: 2px dashed red
    cursor: pointer
    text-decoration: none

</style>
