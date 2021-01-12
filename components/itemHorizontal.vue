<template lang="pug">
.v-itemHorizontal__container
  nuxt-link(:to="{name: 'products', params: { id: item.slug, item: item }}")
    .v-itemHorizontal__image
      .v-itemHorizontal__image__discount(v-if="item.discount_price")
        img(:src="require('@/assets/images/icons/discount.svg')")
        span.v-itemHorizontal__image__discount__countdiscount {{countdiscount()}}

      img(
        :src='item.images ? getImgPath(item.path, item.slug, item.images[0]) : getStaticImage()'
      )
    .v-itemHorizontal__title
      h3.v-itemHorizontal__heading {{ item.title }}
      span.v-itemHorizontal__disclamer Минимальный заказ&nbsp;
      span.v-itemHorizontal__disclamer-value {{ item.minOrder }}{{ item.unit.toLowerCase() }}

  .v-itemHorizontal__prices
    .v-itemHorizontal__clubCost(v-if="item.club_cost && !item.discount_price")
      span.v-itemHorizontal__clubCost-title Клубная:&nbsp;
        span.v-itemHorizontal__clubCost-value.ruble {{ item.club_cost }} &#8381;
        |  {{ item.unit.toLowerCase() }}
    .v-itemHorizontal__cost(:class="{'strike': item.discount_price}")
      span.v-itemHorizontal__cost-title Розница:&nbsp;
        span.v-itemHorizontal__cost-value.ruble {{ item.cost }} &#8381;
        |  {{ item.unit.toLowerCase() }}
    template(v-if="item.discount_price")
      .v-itemHorizontal__discountcost-title Скидка:&nbsp;
        span.v-itemHorizontal__cost-value.ruble {{item.discount_price}} &#8381;
        |  {{ item.unit.toLowerCase() }}
  .v-itemHorizontal__shopping
    .v-itemHorizontal__article
      span Артикул:&nbsp;
      span.article-value {{ item.article }}

    template(v-if='!isInCart(item)')
      .v-itemHorizontal__counter
        .v-itemHorizontal__counter-wrapper
          button.decrease(
            type='button',
            @click='changeProductCount("decrement")'
          ) –
          input.v-itemHorizontal__quantity(
            type='number',
            name='quantity',
            v-model='counterItemControls',
            @change='$event.target.value = item.counter',
            min='1',
            step='1'
          )
          button.increase(
            type='button',
            @click='changeProductCount("increment")'
          ) +
        .v-itemHorizontal__add-to-cart(@click='addToCart')

      .v-itemHorizontal__one-click-buy(@click='orderClick()', :key='item.id')
        img.one-click-buy__icon(
          :src='require("../assets/images/icons/cursor.svg")'
        )
        span.one-click-buy__title Заказать в 1 клик
    template(v-else)
      .isCart(@click='removeItem(item)')
        button.btnisCart Удалить из корзины
  .v-itemHorizontal__favorite(@click='clickFavoritesHandler')
    svg(
      :class='{ isActive: isActive }',
      width='24',
      height='24',
      viewBox='0 0 24 24',
      fill='none',
      xmlns='http://www.w3.org/2000/svg'
    )
      path(
        d='M1.28518 9.81601C1.09463 9.10913 1 8.43319 1 7.78946C1 4.5137 2.53163 2.29573 4.44393 1.44877C6.32385 0.616139 8.88297 0.974507 11.2662 3.50825L11.9931 4.28116L12.7216 3.50968C15.1246 0.965007 17.6927 0.569733 19.566 1.37987C21.4633 2.20032 23 4.40601 23 7.78946C23 8.43294 22.9054 9.1075 22.714 9.81513L22.7138 9.81556C22.0318 12.3412 20.1839 15.1048 17.4002 17.9913L17.4001 17.9914C16.1625 19.275 14.8333 20.4836 13.5019 21.5798C13.0343 21.9637 12.6034 22.3052 12.2175 22.5994L12.2172 22.5996C12.1361 22.6615 12.0633 22.7164 11.9995 22.7643C11.9356 22.7164 11.8629 22.6615 11.7819 22.5997L11.7801 22.5983C11.395 22.3059 10.9646 21.9649 10.4975 21.5802C9.16586 20.4827 7.83751 19.2751 6.59871 17.9913C3.81411 15.1038 1.96732 12.3416 1.28518 9.81601Z',
        stroke='#dc0606',
        stroke-width='2'
      )
  template(v-if="isBuyPopupVisible")
    PopupBuy(:item="item" @close="closePopup" @open='openThankPopup')
  template(v-if="isthankPopupVisible" )
    vPopupThank(@close="closePopup")
</template>

<script>
import imgPath from './mixins/imgPath'
import getStaticImage from './mixins/imgPath'
import addToCartMixin from './mixins/addToCart'
import cartControls from './mixins/cartControls'
import favouritesControl from './mixins/favouritesControl'
import PopupBuy from '@/components/popup/v-popup-buy'
import vPopupThank from '@/components/popup/v-thank-popup'

export default {
  name: 'ItemHorizontal',
  components: { PopupBuy, vPopupThank },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    isBuyPopupVisible: false,
    isthankPopupVisible: false
  }),
  methods: {
    openOneClickBuyPopup() {
      this.$root.$emit('openOneClickBuyPopup')
    },
    orderClick() {
      this.isBuyPopupVisible = true
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
  watch: {
    isBuyPopupVisible() {
      this.isBuyPopupVisible
        ? (document.querySelector('body').style.overflow = 'hidden')
        : (document.querySelector('body').style.overflow = 'auto')
    }
  },
  mixins: [getStaticImage, addToCartMixin, favouritesControl]
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
@import '@/assets/sass/cartStyle/cart.sass'
.v-itemHorizontal
  &__container
    display: flex
    flex-direction: row
    align-items: center
    width: 100%
    // justify-content: space-between
    padding: 10px 41px
    border: 2px solid $gray-4
    position: relative
    @media screen and (max-width: 1900px)
      flex-wrap: wrap
      justify-content: space-around
    @media screen and (max-width: 1310px)
      padding: 10px
      text-align: center
    &:not(:first-child)
      margin-top: -2px
    a
      display: flex
      align-items: center
  &__title
    margin-left: 37px
    max-width: 450px
    margin-right: 62px
    @media screen and (max-width: 1087px)
      margin-top: 35px
      margin-left: unset
      align-self: flex-start
  &__heading
    font-size: 20px
    font-weight: 700
    line-height: 28px
    letter-spacing: .07em
    color: $text
    margin-bottom: 15px
    margin-top: 0
    width: 450px
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    overflow: hidden
    text-overflow: ellipsis

  &__disclamer, &__disclamer-value
    font-size: 20px
    font-weight: 700
    line-height: 28px
    letter-spacing: .07em

  &__disclamer
    color: $gray-4

  &__disclamer-value
    color: $text

  &__prices
    width: 323px
  &__clubCost
    margin-bottom: 10px

  &__clubCost-title, &__cost-title, &__discountcost-title
    font-size: 18px
    line-height: 30px
    letter-spacing: .07em
    text-transform: lowercase

  &__clubCost-title,
  &__discountcost-title
    color: $red
  &__discountcost-title
    margin-top: 10px
  &__cost-title
    color: $text

  &__clubCost-value, &__cost-value
    font-size: 24px
    font-weight: 700

  &__shopping
    margin-left: 60px
    margin-top: 15px
    width: 251px
    @media screen and (max-width: 1087px)
      margin: 25px
      width: inherit
  &__article
    display: block
    background-color: $gray-3
    padding: 8px 0px
    font-size: 16px
    line-height: 19px
    letter-spacing: .07em
    text-align: center
    margin-bottom: 10px
    .article-value
      font-weight: 700

  &__quantity
    width: 126px
    text-align: center
    padding: 4px 0px
    border: 2px solid $yellow
    font-size: 24px
    line-height: 28px
    letter-spacing: .07em
    @include phones
      padding: 0
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
    @include tablets
      flex-direction: column
    .increase, .decrease
      width: 40px
      height: 40px
      border: 2px solid $yellow
      background-color: transparent
      font-size: 24px
      font-weight: 700
      cursor: pointer
      &:active, &:focus
        outline: none
    .increase
      margin-left: -2px
    .decrease
      margin-right: -2px
    &-wrapper
      margin-bottom: 10px
      display: flex
      align-items: center

  &__add-to-cart
    margin-left: 9px
    width: 40px
    height: 40px
    background-image: url('../assets/images/icons/cart.svg')
    background-repeat: no-repeat
    background-position: center
    cursor: pointer
    @include tablets
      position: relative
      margin-left: unset
      margin-bottom: 10px
      width: 100%
  &__add-to-cart::before
    @include tablets
      content: ''
      position: absolute
      z-index: -1
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: #ffe816
  &__one-click-buy
    display: flex
    align-items: center
    justify-content: center
    border: 2px dashed $red
    padding: 8px 0px 8px 0px
    cursor: pointer
    .one-click-buy
      &__icon
        margin-right: 6px
      &__title
        letter-spacing: .07em
        color: $text
  &__favorite
    position: absolute
    top: 15px
    right: 15px
    cursor: pointer
    svg:hover path
      fill: $red
      stroke: $red
      transition: .4s ease-in-out
    .isActive
      fill: $red

a
  text-decoration: none

.v-itemHorizontal__image
  height: 210px
  width: 210px
  user-select: none
  position: relative
  &__discount
    width: 45px
    position: absolute
    left: 0
    z-index: 1
    top: -5px
    display: flex
    justify-content: center
    align-items: center
    @include tablets
      width: 35px
    &__countdiscount
      font-weight: bold
      font-size: 20px
      color: white
      position: absolute
      @include phones
        font-size: 16px
    img
      width: 100%
  img
    width: 100%

input.v-itemHorizontal__quantity
  -webkit-appearance: none
  border-radius: 0

#v-catalog > div.v-catalog > div.v-catalog__content > div.v-catalog__items-wrapper > div.v-catalog__items-wrapper__for_card > div > div:nth-child(1) > div.v-itemHorizontal__shopping > div.isCart
  max-width: none

.strike
  text-decoration: line-through
  opacity: 0.7

</style>
