<template lang="pug">
div
  .v-item(@mouseover="onHover = true"
          @mouseleave="onHover = false")
    .v-item__inner
      
      .v-item__favorite-mark(@click="clickFavoritesHandler")
        svg(:class="{'isActive': isActive}" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
          path(d="M1.28518 9.81601C1.09463 9.10913 1 8.43319 1 7.78946C1 4.5137 2.53163 2.29573 4.44393 1.44877C6.32385 0.616139 8.88297 0.974507 11.2662 3.50825L11.9931 4.28116L12.7216 3.50968C15.1246 0.965007 17.6927 0.569733 19.566 1.37987C21.4633 2.20032 23 4.40601 23 7.78946C23 8.43294 22.9054 9.1075 22.714 9.81513L22.7138 9.81556C22.0318 12.3412 20.1839 15.1048 17.4002 17.9913L17.4001 17.9914C16.1625 19.275 14.8333 20.4836 13.5019 21.5798C13.0343 21.9637 12.6034 22.3052 12.2175 22.5994L12.2172 22.5996C12.1361 22.6615 12.0633 22.7164 11.9995 22.7643C11.9356 22.7164 11.8629 22.6615 11.7819 22.5997L11.7801 22.5983C11.395 22.3059 10.9646 21.9649 10.4975 21.5802C9.16586 20.4827 7.83751 19.2751 6.59871 17.9913C3.81411 15.1038 1.96732 12.3416 1.28518 9.81601Z" stroke="#dc0606" stroke-width="2")
      nuxt-link(:to="{ name: `products`, params: { id: item.slug, item: item }}")
        .v-item__image
          .v-item__image__discount(v-if="item.discount_price")
            span.v-item__image__discount__countdiscount {{countdiscount()}}
            img(:src="require('@/assets/images/icons/discount.svg')")
          img(:src="getImgPath(item.path, item.slug, item.images[0])" :alt="item.title")
      .v-item__content
        nuxt-link(:to="{ name: `products`, params: { id: item.slug, item: item }}")
          .v-item__title
            span {{ item.title }}
        .v-item_price
          .v-item__clubCost(v-if="!item.discount_price")
            span.ruble(v-if="item.club_cost") клубная: {{ item.club_cost }} &#x20bd; {{ item.unit.toLowerCase() }}
          .v-item__cost(:class="{'strike': item.discount_price}")
            span.ruble розница: {{ item.cost }} &#x20bd; {{ item.unit.toLowerCase() }}
          .v-item__discount(v-if="item.discount_price")
            span.ruble(v-if="item.discount_price") скидка: {{ item.discount_price }} &#x20bd; {{ item.unit.toLowerCase() }}
      .v-item__footer
        .v-item__article-wrapper
          span Артикул:
          span.article {{ item.article }}
        template(v-if="!isInCart(item)")
          .v-item__counter
            button.decrease(type="button" @click="changeProductCount('decrement')") -
            input.quantity_value(
              type="number"
              name="quantity"
              v-model="counterItemControls"
              @change="$event.target.value = item.counter"
              min="1"
              step="1"
            )
            button.increase(type="button" @click="changeProductCount('increment')") +
          .v-item__shop(@click="addToCart")
            span.v-item__addToCart В корзину
          transition
            .v-item__orderOneClick(v-if="onHover" @click="orderClick()" :key="item.id")
              .v-item__orderOneClick-wrapper
                img(:src="require('../assets/images/icons/addpneClick.png')")
                span.v-item__addOrder Заказать в 1 клик
        template(v-else)
          .isCart(@click="removeItem(item)")
            button.btnisCart.special-for-item Удалить из корзины
  template(v-if="isBuyPopupVisible")
    PopupBuy(:item="item" @close="closePopup" @open='openThankPopup')
  template(v-if="isthankPopupVisible" )
    vPopupThank(@close="closePopup")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PopupBuy from '@/components/popup/v-popup-buy'
import vPopupThank from '@/components/popup/v-thank-popup'
import favouritesControl from '@/components/mixins/favouritesControl'
import addToCartMixin from '@/components/mixins/addToCart'
import imgPath from '@/components/mixins/imgPath'
import getStaticImage from '@/components/mixins/imgPath'
import cartControls from '@/components/mixins/cartControls'
import addToCart from '@/components/addToCart.vue'
export default {
  name: 'Item',
  components: {addToCart, PopupBuy, vPopupThank },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    onHover: false,
    isBuyPopupVisible: false,
    isthankPopupVisible: false
  }),
  computed: {
    ...mapGetters(['favorites/GET_FAVORITES'])
  },
  methods: {
    orderClick() {
      this.isBuyPopupVisible = true
    },

    closeFavoritePopup() {
      this.isFavoriteVisible = false
    },
    openThankPopup() {
      this.isthankPopupVisible = true
    },
    closePopup() {
      this.isBuyPopupVisible = false
      this.isthankPopupVisible = false
    },
    countdiscount() {
      return  '-' + Math.ceil((this.item.discount_price/this.item.cost*100)-100)*(-1)+'%'
    }
  },
  mixins: [favouritesControl, addToCartMixin, imgPath, getStaticImage]
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
@import '@/assets/sass/cartStyle/cart.sass'

.v-item
  $block: &
  background-color: #fff
  box-sizing: border-box
  position: relative
  transition: box-shadow .1s ease-out
  margin: 3px 5px 3px 1px
  flex: 1 1 20%
  max-width: 295px
  @include tablets
    margin: 5px 5px 5px 5px
  @media screen and(max-width: 628px)
    max-width: inherit
  @include phones
    margin: 0 7px 7px 7px
  &__inner
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    align-items: center
    padding: 0 4px
    position: relative
    @include tablets
      flex-direction: column
      border: 2px solid #bab4b4
    @media screen and(max-width: 628px)
      flex-direction: row
      flex-wrap: wrap
      justify-content: space-between
    @include phones
      padding: 8px 8px 4px 8px
      flex-wrap: wrap
      min-width: 300px
    @media screen and(max-width: 368px)
      padding: 2px 3px 3px 3px
    
  &__favorite-mark
    position: absolute
    right: 8px
    top: 8px
    cursor: pointer
    z-index: 1
    @include phones
      right: 0
      left: 4px
      width: 22px
    @media screen and(min-width: 1000px)
      svg:hover path
        fill: $red
        stroke: $red
        transition: .4s ease-in-out
    .isActive
      fill: $red

    & + a
      text-decoration: none
      margin-top: 3px


  &__image
    display: flex
    justify-content: center
    align-items: center
    position: relative
    box-sizing: border-box
    padding: 10px
    margin: 5px
    border-bottom: 2px solid $text
    height: 230px
    width: 230px
    user-select: none
    @media screen and(max-width: 628px)
      height: inherit
      max-width: 130px
      border: none
      padding: 0
    @include phones
      width: 110px
      padding: 0
      margin-left: 19px
    @media screen and(max-width: 368px)
      // margin: 0
      width: 90px
    @media screen and(max-width: 340px)
      margin-left: 26px
      width: 60px
    img
      width: 100%
      height: 100%
    &__discount
      width: 45px
      position: absolute
      left: -20px
      z-index: 1
      top: -5px
      display: flex
      justify-content: center
      align-items: center
      @include tablets
        width: 35px
      @include phones
        top: -10px
        left: auto
        right: 0
        width: 30px
      &__countdiscount
        font-weight: bold
        font-size: 20px
        color: white
        position: absolute
        @include phones
          font-size: 16px
      img
        width: 100%
  &__content
    z-index: 2
  &__title
    display: flex
    justify-content: center
    align-items: center
    margin: 0 20px 25px 20px

    @include phones
      margin: 0
      justify-content: center

    & > *
      font-weight: bold
      text-align: center
      font-size: 16px
      letter-spacing: .07em
      color: $text
      line-height: 21px
      @media screen and(max-width: 628px)
        font-size: 14px
      @include phones
        font-size: 13px
    span
      width: 247px
      height: 62px
      overflow: hidden
      font-weight: bold
      text-decoration: none !important
      display: -webkit-box
      -webkit-line-clamp: 3
      -webkit-box-orient: vertical
      overflow: hidden
      text-overflow: ellipsis
      font-size: 16px
      @include phones
        font-size: 14px
        
        max-height: 62px
        display: block
        display: -webkit-box
        -webkit-line-clamp: 3
        -webkit-box-orient: vertical
        overflow: hidden
        text-overflow: ellipsis
      @media screen and(max-width: 368px)
        max-height: 42px
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        overflow: hidden
        text-overflow: ellipsis
        
  &__clubCost, &__cost, &__discount
    margin: 0px 20px
    display: flex
    justify-content: center
    align-items: center
    height: 20px
    font-weight: 700
    letter-spacing: .07em
    @include phones
      margin: 0
      display: block
    span
      @include phones
        width: 100%
        text-align: right

  &__clubCost
    margin-top: 4px
    color: $red
  &__discount
    color: $red

  &__article-wrapper
    display: flex
    justify-content: center
    align-items: center
    margin: 10px  0px
    padding: 3px 56px
    font-weight: 400
    letter-spacing: .07em
    background-color: $yellow
    font-weight: bold
    @include phones
      margin: 0
      padding: 0
      background-color: transparent
      font-size: 11px
    .article
      display: inline-block
      font-size: 13px
      margin-left: 4px
      font-weight: 800
      color: $red

  &__counter
    display: flex
    justify-content: center
    align-items: center
    margin-top: 15px
    font-size: 18px
    @media screen and(max-width: 628px)
      margin-top: 0
      font-size: 16px

    .decrease, .increase
      width: 25px
      height: 33px
      background-color: white
      border: 2px solid $yellow
      cursor: pointer
      font-weight: 700
      outline: none
      font-size: 20px
      @include phones

        font-size: 18px
        display: flex
        align-items: center
        justify-content: center
      &:active
        background-color: $yellow
    .decrease
      margin-right: -2px
    .increase
      margin-left: -2px

    .quantity_value
      width: 60px
      background-color: white
      border: 2px solid $yellow
      text-align: center
      cursor: text
      font-weight: 700
      outline: none
      letter-spacing: .07em
      height: 33px
      @include phones
        display: flex
        align-items: center
        height: 33px
        outline: none

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button
        -webkit-appearance: none
        margin: 0
    input[type=number]
      -moz-appearance: textfield
  &__orderOneClick
    display: flex
    justify-content: center
    align-items: center
    padding: 8px 0
    padding-right: 4px
    font-size: 22px
    cursor: pointer
    position: absolute
    bottom: -40px
    left: 50%
    transform: translateX(-50%)
    border: 2px dashed $red
    background-color: #fff
    width: fit-content
    @include phones
      display: none
    &-wrapper
      display: flex
      align-items: center
      padding: 0px
      img
        width: 20px
        height: 20px
      span
        margin-left: 6px
        font-size: 14px

  &::before
    position: absolute
    content: ''
    top: 0
    left: 0
    width: 100%
    height: 100%
    border: 2px solid #bab4b4
    background-color: transparent
    @include tablets
      content: none
  &:hover
    z-index: 4
    opacity: 1
    &::before
      box-shadow: 0px 8px 32px rgba($text, .3)
      background-color: #fff
      height: calc( 100% + 45px )
  .v-item__content
    @include phones
      display: flex
      flex-direction: column
      max-width: 200px

    a
      text-decoration: none
  .v-item__footer
    width: 100%
    position: relative
    flex-direction: column
    display: flex
    align-items: center
    @media screen and(max-width: 628px)
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      width: 100%
    @include phones
      display: flex
      align-items: center
      justify-content: space-between
      width: 100%
      flex-direction: row
      height: 33px
  .v-item_price
    @include phones
      font-size: 14px
      max-width: 200px
      align-self: flex-end

input.quantity_value
  -webkit-appearance: none
  border-radius: 0

.v-item__shop
  @media screen and(max-width: 368px)
    padding: 10px 4px
    width: fit-content

.btnisCart
  background-color: transparent
  margin: 19px 0
  padding: 9px
  width: 100%
  border: 3px dashed $yellow
  cursor: pointer
  outline: none
  @include phones
    margin: 0
    padding: 0
    font-size: 13px
    margin-bottom: 3px

//специально для когда кликаешь на добавить-удалить из крзины , чтобы карточки были одной высоты
.special-for-item
  margin: 32px 0 33px !important
  @include phones
    margin: 0 !important
.v-item__footer .isCart
  position: relative



.ruble
  font-family: "Roboto"
.strike
  text-decoration: line-through
  opacity: 0.7

.v-item__cost.ruble
  margin-left: 2px
  @include phones
    margin-left: 0
.v-item__discount.ruble
  margin-left: 12px
  @include phones
    margin-left: 0
</style>

