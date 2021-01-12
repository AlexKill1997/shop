<template lang="pug">
.v-itemHSmall
  .v-itemHSmall__main-container
    .v-itemHSmall__image-content
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
      img.v-itemHSmall__image(:src='getImgPath(item.path, item.slug, item.images[0])')
      span.v-itemHSmall__article Артикул:&nbsp;
        span.article-value {{ item.article }}
    .v-itemHSmall__container
      h4.v-itemHSmall__heading {{ item.title }}
      .v-itemHSmall__body
        .v-itemHSmall__counter
          button.decrease(
            type='button',
            @click='changeProductCount("decrement")'
          ) –
          input.quantity-counter(
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
        .v-itemHSmall__prices
          span.prices__clubcost.ruble(v-if="item.club_cost") клубная: {{ item.club_cost }} &#8381; {{ item.unit.toLowerCase() }}
          span.prices__cost.ruble(:class="{'strike': item.discount_price}") розница: {{ item.cost }} &#8381; {{ item.unit.toLowerCase() }}
          span.prices__discount.ruble(v-if="item.discount_price") скидка: {{ item.discount_price }} &#8381; {{ item.unit.toLowerCase() }}

  .v-itemHSmall__summary-wrapper
    .v-itemHSmall__summary
      h6 Итого:
      span.ruble {{summaryproduct()}} &#8381;
</template>

<script>
import addToCartMixin from './mixins/addToCart'
import favouritesControl from './mixins/favouritesControl'
import imgPath from '@/components/mixins/imgPath'
export default {
  name: 'ItemHorizontalSmall',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    summaryproduct() {
      return this.item.counter * (this.item.discount_price ? this.item.discount_price : this.item.cost)
    }
  },

  mixins: [addToCartMixin, favouritesControl, imgPath]
}
</script>

<style lang="sass">
@import '@/layouts/mixins.sass'

.v-itemHSmall
  &__main-container
    position: relative
    display: flex
    flex-direction: row
    border: 2px solid $gray-4
    padding: 10px
    margin-bottom: 5px
  &__image-content
    display: flex
    flex-direction: column
    align-items: flex-start
    justify-content: space-between
  &__favorite
    position: absolute
    width: 14px
    height: auto
    top: 10px
    left: 8px
    cursor: pointer
    svg
      cursor: pointer
    svg:hover path
      stroke: $red
      transition: .4s ease-in-out
    .isActive
      fill: $red
  &__image
    width: 90px
    height: auto
    margin: 10px 24px 0px 10px

  &__article
    margin-left: 10px
    margin-top: 5px
    font-size: 10px
    letter-spacing: .07em
    line-height: 12px
    margin-bottom: 8px
    @include phones
      margin-top: 0
    .article-value
      font-weight: 700

  &__container
    display: flex
    flex-direction: column
    @include phones
      justify-content: space-between
  &__heading
    margin-top: 0px
    margin-bottom: 32px
    padding: 0px 32px
    font-size: 14px
    font-weight: 400
    letter-spacing: .07em
    text-align: center
    font-weight: bold
    @include phones
      margin-bottom: 10px
      padding: 0px 32px 0 5px

  &__body
    display: flex
    flex-direction: row
    justify-content: space-between
    @include phones
      flex-direction: column-reverse
      align-items: center
  &__counter
    display: flex
    flex-direction: row
    align-self: flex-end
    @include phones
      align-self: center
    .quantity-counter
      max-width: 60px
      text-align: center
      font-weight: 700
      border: 2px solid $yellow
      height: 30px
      @include phones
        display: flex
        justify-content: center
        align-items: center
        height: 25px
      &:active, &:focus
        outline: none
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button
        -webkit-appearance: none
        margin: 0
    input[type=number]
      -moz-appearance: textfield

    .decrease, .increase
      border: 2px solid $yellow
      background-color: white
      font-weight: 700
      font-size: 18px
      cursor: pointer
      height: 30px
      width: 20px
      @include phones
        height: 25px
        display: flex
        align-items: center
        justify-content: center
      &:active, &:focus
        outline: none
    .decrease
      margin-right: -2px
    .increase
      margin-left: -2px

  &__prices
    font-size: 14px
    font-weight: 700
    letter-spacing: .07em
    margin-left: 16px
    display: flex
    flex-direction: column
    @include phones
      margin-bottom: 10px
      margin-left: 0
      align-self: flex-end
    .prices__clubcost, .prices__cost
      display: inline-block
    .prices__clubcost
      color: $red
      margin-bottom: 4px
    .prices__discount
      color: $red

  &__summary
    background-image: url('../assets/images/items/summary-bg.png')
    background-repeat: no-repeat
    background-size: contain
    display: flex
    flex-direction: column
    width: 190px
    height: 70px
    &-wrapper
      display: flex
      // flex-direction: row-reverse
      justify-content: center
      @include phones
        justify-content: center
    h6, span
      margin-left: 22%
      font-size: 14px
      font-weight: 700
      letter-spacing: .07em
      color: white
    h6
      margin-top: 17px
      margin-bottom: 2px
    span
      display: inline-block
      padding-left: 1px

input.quantity-counter
  -webkit-appearance: none
  border-radius: 0

.strike
  text-decoration: line-through
  opacity: 0.7

</style>
