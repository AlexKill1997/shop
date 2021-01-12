<template lang="pug">
transition(name='deleteCart')
  .v-cart__table-item(v-if='show')
    .v-cart__table-item__inside
      .v-cart__table-item__heart(v-if="isPage==='cart'" @click='clickFavoritesHandler')
        svg.v-cart__table-add-favorite(
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
      .v-cart__table-item__top
        nuxt-link(:to="`products/region/${REGION.value}/${item.slug}`")
          .v-cart__table-item-photo
            .v-cart__table-item-photo__discount(v-if="item.discount_price")
              img(:src="require('@/assets/images/icons/discount.svg')")
              span.v-item__image__discount__countdiscount {{countdiscount()}}
            img.v-cart__table-item-photo-product-img(
              :src='getImgPath(item.path, item.slug, item.images[0])'
            )
        .v-cart__table-item__top__content
          nuxt-link.v-cart__table-item-heading(:to="`products/region/${REGION.value}/${item.slug}`")
            h4 {{ item.title }}
          .v-cart__table-item-content-cost(:class="{'strike': item.discount_price}")
            span.ruble Цена: {{ item.cost }} &#x20bd; {{ item.unit.toLowerCase() }}
          .v-cart__table-item-content-costprice(v-if="item.discount_price")
            span.ruble Цена: {{ item.discount_price }} &#x20bd; {{ item.unit.toLowerCase() }}
         
      .v-cart__table-item-article
        span Артикул: &nbsp;
        span {{ item.article }}
      .v-cart__table-item-cost
        .v-cart__table-item-usualcost(:class="{'strike': item.discount_price}")
          span.ruble {{ item.cost }} &#x20bd;
        .v-cart__table-item-discount(v-if="item.discount_price")
          span.ruble {{ item.discount_price }} &#x20bd;
      
      .v-cart__table-item-counter(v-if="isPage==='cart'")
        button.counter-decrease(@click='changeCount("decrement")') –
        input.counter-field(
          type='number',
          name='quantity',
          ref='input',
          min='1',
          step='1',
          @change='$event.target.value = item.counter',
          v-model='counterItemControls'
        )
        button.counter-increase(@click='changeCount("increment")') +
      .v-cart__table-item-summary
        span.summary-value.ruble {{ summary() }} &#x20bd;
      .v-cart__table-item__footer
        .v-cart__table-item__footer-article
          span Артикул: &nbsp;
          span {{ item.article }}
        .v-cart__table-item__footer__right
          .v-cart__table-item__footer-counter
            button.counter-decrease(@click='changeCount("decrement")') –
            input.counter-field(
              type='number',
              name='quantity',
              ref='input',
              min='1',
              step='1',
              @change='$event.target.value = item.counter',
              v-model='counterItemControls'
            )
            button.counter-increase(@click='changeCount("increment")') +
          .v-cart__table-item__footer-garbage
            img.v-cart__table-delete(
              :src='require("../assets/images/cart/trash.svg")',
              title='Удалить товар из корзины',
              @click='removeItem(item)'
            )

    .v-cart__table-item__garbage
      img.v-cart__table-delete(
        :src='require("../assets/images/cart/trash.svg")',
        title='Удалить товар из корзины',
        @click='removeItem(item)'
      )
</template>

<script>
import cartControlsMixin from '@/components/mixins/cartControls'
import imgPath from '@/components/mixins/imgPath'
import favouritesControl from '@/components/mixins/favouritesControl'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'ItemCart',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    summary() {
      let cost = this.item.discount_price ? this.item.discount_price : this.item.cost
      let counter = this.item.counter || this.item.count
      return (cost * counter).toFixed(2)
    },
    countdiscount() {
      return  '-' + Math.ceil((this.item.discount_price/this.item.cost*100)-100)*(-1)+'%'
    }
  },
  computed: {
    ...mapGetters({
      isPage: 'GET_PAGE',
      cart: 'cart/GET_PRODUCTS_FROM_CART',
    })
  },
  data: () => ({
    show: true
  }),
  mixins: [cartControlsMixin, favouritesControl, imgPath]
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
.v-cart
  &__table-wrapper
    display: flex
    width: 100%
  &__table-body
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
  &__table-item
    text-align: center
    position: relative
    display: flex
    justify-content: space-between
    align-items: center
    @media screen and (max-width: 1180px)
      width: 80%
    @media screen and (max-width: 600px)
      width: 90%
    @include phones
      width: 100%
    &-photo
      width: 120px
      position: relative
      @include phones
        width: 100px
      @media screen and(max-width: 367px)
        width: 90px
      @media screen and(max-width: 340px)
        width: 70px
      &__discount
        width: 45px
        position: absolute
        left: 4px
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
      &-product-img
        width: 100%
      @media screen and (max-width: 1210px)
        margin: unset

    &-heading
      text-align: left
      max-width: 290px
      font-weight: bold
      letter-spacing: .07em
      line-height: 21px
      height: fit-content
      margin-left: 10px
      text-decoration: none
      color: black
      display: block
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
      overflow: hidden
      text-overflow: ellipsis
      @include phones
        margin-left: 0
        display: block
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        overflow: hidden
        text-overflow: ellipsis
        text-align: center
        margin-left: 10px

      h4
        margin: 0
        font-size: 16px
        @include phones
          font-size: 14px
          font-weight: bold
    &-article, .v-cart__table-item__footer-article
      font-weight: bold
      line-height: 19px
      letter-spacing: .07em
      white-space: nowrap
      color: $red
      @media screen and (max-width: 1210px)
        display: flex
        white-space: nowrap
        justify-content: center
      @include phones
        font-size: 10px
        font-weight: bold
      span:nth-child(2)
        font-size: 14px
        color: $red
      span:first-child, span:nth-child(3)
        display: none
        @media screen and (max-width: 1210px)
          display: flex
        @include phones
          padding-left: 5px
          text-align: center

    &-cost
      font-weight: bold
      letter-spacing: .07em
      line-height: 19px
      width: 160px
      @media screen and (max-width: 1210px)
        justify-content: flex-end
        @media screen and (max-width: 1210px)
          display: flex
      @include phones
        font-weight: bold
    &-discount
      display: flex
      justify-content: center
      font-weight: bold
      letter-spacing: .07em
      line-height: 19px
      width: 160px
      @media screen and (max-width: 1210px)
        justify-content: flex-end
        @media screen and (max-width: 1210px)
          display: flex
      @include phones
        font-weight: bold
      // width: 120px
    &-counter, .v-cart__table-item__footer-counter
      .counter-field
        width: 113px
        letter-spacing: .07em

        @include phones
          padding: 0
          display: flex
          align-items: center !important
          justify-content: center
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button
          -webkit-appearance: none
          margin: 0
        @media screen and (max-width: 568px)
          white-space: nowrap
          width: 60px


      .counter-field, .counter-decrease, .counter-increase
        text-align: center
        border: 2px solid $yellow
        font-size: 18px
        font-weight: bold
        background-color: transparent
        @include phones
          font-size: 16px
          height: 33px
          padding: 0
        &:active, &:focus
          outline: none

      .counter-decrease, .counter-increase
        cursor: pointer
        width: 40px
        height: 40px
        @include phones
          width: 25px
          height: 33px
          width: 25px
          background-color: white
          border: 2px solid $yellow
          cursor: pointer
          font-weight: bold
          outline: none
          display: flex
          align-items: center !important
          justify-content: center
          font-size: 18px
          line-height: 1px !important

      .counter-decrease
        margin-right: -2px

      .counter-increase
        margin-left: -2px

      input[type=number]
        -moz-appearance: textfield

    &-summary, .v-cart__table-item__footer-summary
      position: relative
      display: flex
      align-items: center
      // width: 120px
      font-size: 20px
      font-weight: bold
      line-height: 21px
      letter-spacing: .07em
      justify-content: flex-end
      color: $red


  &__table-delete
    position: relative
    right: 0
    cursor: pointer
    width: 100%
  svg
    cursor: pointer
    &:hover path
      fill: $red
      stroke: $red
      transition: .4s ease-in-out

  .isActive
    fill: $red

.v-cart__table-item__heart
  position: absolute
  width: 25px
  top: 5px
  left: 4px
  @include phones
    left: 20px
  @media screen and(max-width: 383px)
    left: 6px

.deleteCart-enter-active, .deleteCart-leave-active
  transition: opacity .5s

.deleteCart-enter, .deleteCart-leave-to
  opacity: 0

.v-cart__table-item__top
  display: flex
  align-items: center
  @include phones
    width: 100%
    justify-content: space-between

.v-cart__table-item__inside
  border: 2px solid #BAB4B4
  border-bottom: none
  display: flex
  align-items: center
  max-width: 1100px
  width: 1100px
  justify-content: space-between
  padding: 9px 18px 9px 41px
  @media screen and(max-width: 1180px)
    flex-direction: column
    width: 100%
  @include phones
    border-bottom: 2px solid #BAB4B4
    width: inherit
    margin: 0 18px 7px 18px
    padding: 8px 8px 4px 27px
  @media screen and(max-width: 383px)
    margin: 0 5px 7px 5px
.v-cart__table-item__footer
  display: none
  @media screen and(max-width: 1180px)
    display: flex
    align-items: center
    width: 100%
    justify-content: space-between
  @include phones

.v-cart__table-item__garbage
  margin-left: 25px
  @media screen and(max-width: 1180px)
    display: none

.v-cart__table-item-article,
.v-cart__table-item-cost,
.v-cart__table-item-counter,
.v-cart__table-item-summary,
.v-cart__table-item__garbage
  @media screen and(max-width: 1180px)
    display: none

.v-cart__table-item-counter
  display: flex
  @media screen and(max-width: 1180px)
    display: none
.v-cart__table-item__footer-cost
  @media screen and(max-width: 1180px)
    display: none

.v-cart__table-item__footer__right
  display: flex
  align-items: center

.v-cart__table-item-content-costprice
  display: none
  @media screen and (max-width: 1210px)
    justify-content: flex-end
  @media screen and(max-width: 1180px)
    display: flex
    font-weight: bold
    letter-spacing: .07em
    line-height: 19px
    max-width:
  @include phones
    font-size: 16px
    margin-top: 10px
.v-cart__table-item-content-cost
  display: none
  @media screen and (max-width: 1210px)
    justify-content: flex-end
  @media screen and(max-width: 1180px)
    display: flex
    font-weight: bold
    letter-spacing: .07em
    line-height: 19px
    max-width:
  @include phones
    font-size: 16px
    margin-top: 10px

    span:first-child, span:nth-child(3)
      display: none
      @media screen and (max-width: 1210px)
        display: flex
      @include phones
        font-weight: bold


.v-cart__table-item__top__content
  font-size: 14px
  @include phones
    // width: 208px

.v-cart__table-item__footer-counter
  display: flex
  justify-content: center
  align-items: center
  @media screen and(max-width: 1180px)

    margin-right: 30px
  @include phones
    display: flex
    margin-right: 15px

.v-cart__table-item__footer-garbage
  @include phones
    width: 15px
    height: 15px
.v-cart__table-item-summary
  min-width: 120px




input.counter-field
  width: 60px
  background-color: white
  border: 2px solid $yellow
  text-align: center
  cursor: text
  font-weight: bold
  outline: none
  letter-spacing: .07em
  -webkit-appearance: none
  border-radius: 0

  @include phones
    display: flex
    align-items: center !important
    height: 25px
    outline: none

.v-cart__table-body > div:last-child > div.v-cart__table-item__inside
  border-bottom: 2px solid #BAB4B4



</style>
