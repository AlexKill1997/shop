<template lang="pug">
    .v-item__shop(@click="addToCart")
        span.v-item__addToCart В корзину
</template>

<script>
import addToCartMixin from './mixins/addToCart'

export default {
    name: 'addToCart',
    props: {
        item: Object,
        default: () => {}
    },
    mixins: ['addToCartMixin'],
    
}
</script>

<style lang="sass">

@import '../layouts/mixins.sass'

.v-item
  &__shop
    display: flex
    justify-content: center
    align-items: center
    margin: 15px 75px
    padding: 6px 20px
    font-family: 'Roboto Bold'
    font-size: 16px
    text-transform: uppercase
    background-color: $yellow
    cursor: pointer
    position: relative
    @media screen and(max-width: 628px)
      padding: 5px 0 5px
      margin: 0
    @include phones
      padding: 10px 0
      margin: 0
      width: 100px

  &__addToCart
    font-size: 16px
    font-weight: 700
    @include phones
      font-size: 12px

</style>
