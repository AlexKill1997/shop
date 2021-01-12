<template lang="pug">
.v-itemFavorites__current
  .v-itemFavorites__checkBox
    input.__checkBox(type='checkbox', :id='item.id', v-model='checkControl' :disabled="isInCart(item)")
    label(:for='item.id')
  .v-itemFavorites__container
    .v-itemFavorites__favorite(@click='clickFavoritesHandler')
      svg(
        stroke='#dc0606',
        fill='#dc0606',
        width='24',
        height='24',
        viewBox='0 0 24 24',
        xmlns='http://www.w3.org/2000/svg'
      )
        path(
          d='M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z'
        )
    .v-itemFavorites__top
      nuxt-link(:to='{ name: "products", params: { id: item.slug, region: REGION.value } }')
        img.v-itemFavorites__cart-icon(v-if="isInCart(item)" src="~@/assets/images/icons/cart_3.svg")
        .v-itemFavorites__image
          .v-itemFavorites__image__discount(v-if="item.discount_price")
            img(:src="require('@/assets/images/icons/discount.svg')")
            span.v-itemFavorites__image__discount__countdiscount {{countdiscount()}}
          img(:src='getImgPath(item.path, item.slug, item.images[0])')
      .v-itemFavorites__title
        nuxt-link.v-itemFavorites__heading(
          :to='{ name: "products", params: { id: item.slug, region: REGION.value } }'
        ) {{ item.title }}
        .v-itemFavorites__title__cost
          p.v-itemFavorites__title__cost__club.ruble(v-if="item.club_cost && !item.discount_price") клубная: {{ item.club_cost }} &#x20bd; {{ item.unit.toLowerCase() }}
          p.v-itemFavorites__title__cost__notclub.ruble(:class="{'strike': item.discount_price}") розница: {{ item.cost }} &#x20bd; {{ item.unit.toLowerCase() }}
          p.v-itemFavorites__title__cost__discount.ruble(v-if="item.discount_price") скидка: {{ item.discount_price }} &#x20bd; {{ item.unit.toLowerCase() }}
    .v-itemFavorites__footer
      .v-itemFavorites__cost
          p.v-itemFavorites__title__cost__club.ruble(v-if="item.club_cost && !item.discount_price") клубная: {{ item.club_cost }} &#x20bd; {{ item.unit.toLowerCase() }}
          p.v-itemFavorites__title__cost__notclub.ruble(:class="{'strike': item.discount_price}") розница: {{ item.cost }} &#x20bd; {{ item.unit.toLowerCase() }}
          p.v-itemFavorites__title__cost__discount.ruble(v-if="item.discount_price") скидка: {{ item.discount_price }} &#x20bd; {{ item.unit.toLowerCase() }}
          .v-itemFavorites__cost__shopping
            span.article-value Артикул:
            strong &nbsp;{{ item.article }}
      .v-itemFavorites__shopping
        span.article-value Артикул:
        strong &nbsp;{{ item.article }}
      .v-itemFavorites__counter
        .v-itemFavorites__counter-wrapper
          button.decrease(
            type='button',
            @click='changeFavoriteCount("decrement")'
          ) –
          input.v-itemFavorites__quantity(
            type='number',
            name='quantity',
            ref='favoriteInput',
            min='1',
            step='1',
            v-model='inputControl',
            @change='$event.target.value = item.counter'
          )
          button.increase(
            type='button',
            @click='changeFavoriteCount("increment")'
          ) +
      .v-itemFavorites__addToCart
</template>

<script>
import favouriteControls from '@/components/mixins/favouritesControl'
import addToCartMixin from '@/components/mixins/addToCart'
import imgPath from '@/components/mixins/imgPath'
import addToCart from '@/components/addToCart.vue'

import { mapGetters } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  name: 'itemFavorites',
  components: { addToCart },
  computed: {
    ...mapGetters('favorites', ['GET_CHECKED_STATUS']),
    ...mapGetters('cart', ['IS_IN_CART']),
    inputControl: {
      get() {
        return this.item.counter
      },
      set(val) {
        this.changeFavoriteCount('set', +val)
      }
    },
    checkControl: {
      get() {
        return this.GET_CHECKED_STATUS(this.item)
      },
      set(val) {
        this.selectFromWhishlistToCart(val)
      }
    }
  },
  methods: {
    openOneClickBuyPopup() {
      this.$root.$emit('openOneClickBuyPopup')
    },

    selectFromWhishlistToCart(value) {
      if (!value) {
        this.$emit('change', 'uncheck')
      } else {
        this.$emit('change', 'check')
      }
    },
    countdiscount() {
      return  '-' + Math.ceil((this.item.discount_price/this.item.cost*100)-100)*(-1)+'%'
    }
  },
  mixins: [addToCartMixin, favouriteControls, imgPath]
}
</script>

<style lang="sass" scoped>
@import '../layouts/mixins.sass'
@import '@/assets/sass/checkboxStyles/checkbox.sass'
.v-itemFavorites
  &__cart-icon
    position: absolute
    top: 10px
    right: 10px

  &__current
    display: flex
    align-items: center
    justify-content: center
    margin: 0 auto 15px auto
    grid-area: current
    @media screen and (max-width: 800px)
      padding: 0 23px
    @include phones
      max-width: 100vw
      grid-area: unset
      margin: 0
      padding: 0
  &__checkBox
    display: flex
    align-items: center
    position: relative
    top: -35px
    color: #FF0202
    margin-left: 15px


    @include phones
      margin-left: 5px
    input[type="checkbox"]:checked + label:after,
    input[type="checkbox"]:not(:checked) + label:after
      left: 0
      top: 23px
      width: 12px
      height: 7px
      border-radius: 1px
      border-left: 4px solid #FF0202
      border-bottom: 4px solid #FF0202
      -webkit-transform: rotate(-45deg)
      -moz-transform: rotate(-45deg)
      -o-transform: rotate(-45deg)
      -ms-transform: rotate(-45deg)
      transform: rotate(-45deg)
    input[type="checkbox"]:checked + label:before,
    input[type="checkbox"]:not(:checked) + label:before,
      content: ""
      position: absolute
      left: -3px
      top: 20px
      width: 20px
      height: 20px
      border: 2px solid #BAB4B4
      background-color: #ffffff
    input[type="checkbox"]:not(:checked) + label:after,
      opacity: 0
    input[type="checkbox"]:checked + label:after,
      opacity: 1

  &__container
    background-color: white
    position: relative
    display: flex
    align-items: center
    padding: 8px 8px 0 14px
    border: 2px solid #bab4b4
    max-width: 975px
    width: 975px
    height: 160px
    margin-left: 10px
    margin-right: 15px
    justify-content: space-between
    @media screen and(max-width: 800px)
      flex-direction: column
      height: inherit
    @include phones
      margin: 0 5px 7px 5px
      padding-bottom: 4px
      padding: 8px 8px 4px 27px




  &__title
    font-family: Roboto
    font-style: normal
    font-weight: bold
    line-height: 21px
    letter-spacing: 0.07em
    height: fit-content
    max-width: 324px
    @include phones
      max-width: 200px
    @media screen and(max-width: 360px)
      max-width: 181px
    &__cost
      display: none
      @include phones
        display: block
        text-align: right
        font-size: 14px
        margin-top: 4px
      &__club, &__discount
        color: $red
  &__heading
    font-size: 16px
    font-weight: 700
    letter-spacing: .07em
    color: $text
    max-width: 300px
    text-decoration: none
    display: -webkit-box
    -webkit-line-clamp: 3
    -webkit-box-orient: vertical
    overflow: hidden
    text-overflow: ellipsis
    @media screen and (max-width: 800px)
      font-weight: normal
      text-align: center
      letter-spacing: 0.07em
      margin: 0 auto
    @include phones
      font-size: 13px
      font-weight: bold
      line-height: 15px
      text-align: center
      display: block
      display: -webkit-box
      -webkit-line-clamp: 3
      -webkit-box-orient: vertical
      overflow: hidden
      text-overflow: ellipsis
      height: 46
      text-decoration: none
  &__disclamer, &__disclamer-value
    font-size: 24px
    font-weight: 700
    line-height: 28px
    letter-spacing: .07em

  &__disclamer
    color: $gray-4

  &__disclamer-value
    color: $text

  &__image
    display: flex
    align-items: center
    justify-content: center
    margin-left: 6px
    width: 120px
    margin-right: 10px
    position: relative
    @media screen and (max-width: 800px)
      display: flex
      align-items: center
      justify-content: center
      grid-area: image
    @include phones
      margin: 10px
      height: inherit
      width: 100px
      max-width: 100px
    @media screen and (max-width: 390px)  
      margin-left: 0
      width: 80px
    @media screen and (max-width: 360px)
      width: 60px
    @media screen and (max-width: 335px)
      width: 46px
    // @media screen and(max-width: 330px)
    &__discount
      width: 45px
      position: absolute
      right: 4px
      z-index: 1
      top: 4px
      display: flex
      justify-content: center
      align-items: center
      @include tablets
        width: 35px
      @include phones
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
  &__image img
    width: 100%




  &__clubCost
    margin-bottom: 10px

  &__clubCost-title, &__cost-title
    font-size: 20px
    line-height: 30px
    letter-spacing: .07em
    text-transform: lowercase

  &__clubCost-title, &__discount-title
    color: $red

  &__cost-title
    color: $text

  &__clubCost-value, &__cost-value
    font-size: 14px
    font-weight: 700

  &__cost__shopping
    font-family: Roboto
    font-style: normal
    font-size: 14px
    line-height: 16px
    letter-spacing: 0.07em
    display: flex
    justify-content: center
    margin-top: 10px
    @include phones
      font-size: 10px

    .article-value
      font-weight: bold
      @media screen and (max-width: 800px)
        display: block
      @include phones
        font-size: 10px
        font-weight: bold
    strong
      color: $red
      font-size: 14px
  &__quantity
    width: 126px
    text-align: center
    padding: 4px 0px
    border: 2px solid $yellow
    font-size: 24px
    letter-spacing: .07em
    display: flex
    align-items: center
    justify-content: center
    border-radius: 0%
    height: 40px
    @include tablets
      width: 100px
    @include phones
      font-size: 16px
      padding: 0
      display: flex
    &:active, &:focus
      outline: none
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button
      -webkit-appearance: none
      margin: 0
  input[type=number]
    -moz-appearance: textfield

  &__counter
    display: flex
    flex-direction: row
    justify-content: flex-end
    text-align: center


    .increase, .decrease
      width: 40px
      height: 40px
      border: 2px solid $yellow
      background-color: transparent
      font-size: 24px
      font-weight: 700
      cursor: pointer
      display: flex
      align-items: center
      justify-content: center
      @include tablets
        width: 30px
        height: 30px
      @include phones
        width: 25px
        height: 33px
        font-size: 18px
        line-height: 1px !important
      &:active, &:focus
        outline: none
    .increase
      margin-left: -2px
    .decrease
      margin-right: -2px
    &-wrapper
      display: flex
      align-items: center
  &__quantity
    @media screen and (max-width: 800px)
      max-width: 126px
      width: 100px
      height: 40px
    @include tablets
      height: 30px
    @include phones
      width: 60px
      height: 33px
  &__addToCart
    display: none
    @media screen and (max-width: 800px)
      text-align: center

    .v-item__shop
      margin: unset
      margin-bottom: 10px
      max-width: 200px
      width: 200px
      height: 40px
      @include tablets
        width: inherit
        height: inherit
        padding: 10px
      @include phones
        margin-bottom: 0
        padding: 5px 12px
      @media screen and(max-width: 376px)
        padding: 5px 5px
      @media screen and(max-width: 335px)
        padding: 2px 2px
  &__favorite
    position: absolute
    top: 2px
    left: 2px
    cursor: pointer
    width: 25px
    svg
      width: 100%


.v-itemFavorites__top
  display: flex
  align-items: center
  justify-content: space-between
  @media screen and(max-width: 800px)
    width: 100%

  a
    @include phones
      margin-top: 3px

.v-itemFavorites__footer
  display: flex
  align-items: center
  justify-content: space-between
  width: 50%
  @media screen and(max-width: 800px)
    width: 100%
    align-items: center
    justify-content: space-between


.v-itemFavorites__top__cost-value
  display: none
  @media screen and(max-width: 800px)
    display: block
    text-align: right
  @include phones
    font-size: 14px
    margin-top: 10px
.v-itemFavorites__footer__cost-value
  @media screen and(max-width: 800px)
    display: none

.v-itemFavorites__checkBox > input[type="checkbox"]
  &:disabled
    &+label
      opacity: 0.3

  position: absolute
  left: -9999px



.btnisCart
  background-color: transparent
  margin: 19px 0
  padding: 9px
  width: 100%
  border: 3px dashed red
  cursor: pointer
  outline: none
  @include phones
    margin: 0
    padding: 0
    font-size: 13px
    margin-bottom: 3px

input.v-itemFavorites__quantity
  -webkit-appearance: none
  border-radius: 0

.v-itemFavorites__cost
  font-family: Roboto
  font-style: normal
  font-weight: bold
  font-size: 16px
  line-height: 19px
  letter-spacing: 0.07em
  white-space: nowrap
  @media screen and(max-width: 800px)
    display: none

.v-itemFavorites__shopping
  display: none
  @media screen and(max-width: 800px)
    display: flex
  @include phones
    font-style: normal
    font-size: 14px
    line-height: 16px
    letter-spacing: 0.07em
    justify-content: center
    margin-top: 10px
    font-size: 10px
  .article-value
    font-weight: normal
    @media screen and (max-width: 800px)
      display: block
    @include phones
      font-size: 10px
      font-weight: bold
  strong
    color: $red
    font-size: 13px

.strike
  text-decoration: line-through
  opacity: 0.7
</style>
