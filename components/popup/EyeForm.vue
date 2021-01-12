<template lang="pug">
  #v-eye-form
    .v-eye-form__container

      .v-eye-form__container__block(v-for="(order, index) in orders")
        img.v-eye-form__container__block__closeIcon(
        :src="require('@/assets/images/icons/close_mark.svg')"
        title="Закрыть окно"
        alt="Закрыть"
        @click="closeEyeForm")
        .v-eye-form__container__block__card-orderNumber Номер заказа: {{order.number}}
        .v-eye-form__container__block__card-container

          .v-eye-form__container__block__card-container__card
            vItemCart(
            v-for="item in currentOrderProducts"
            :key="item.id"
            :item="item"
            )
            //- .v-eye-form__container__block__card-container__card__header
            //-   h3.v-eye-form__container__block__card-container__card__header__heading Металлочерепица ГрандЛайн Modern PE(0,45) fviubfrviu oivhweohevw  osi
            //-   .v-eye-form__container__block__card-container__card__header__article Артикул:
            //-     span  62966
            //- .v-eye-form__container__block__card-container__card__number кол-во:
            //-   span  99909 штук
            //- .v-eye-form__container__block__card-container__card__price цена:
            //-   span.ruble  25,00&nbsp; &#8381; &nbsp;
        .v-eye-form__container__block__sum итого:
          span  {{ currentProductsSum }} &#8381;
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import vItemCart from '@/components/ItemCart'

export default {
  components: {
    vItemCart
  },
  data:()=>({
    closeLay: true
  }),
  methods:{
    closeEyeForm(){
      this.$emit('closeEyeForm')
    }
  },
  computed: {
    ...mapGetters({
      currentOrderProducts: 'orders/GET_CURRENT_ORDER_PRODUCTS',
      isPage: 'GET_PAGE',
      orders: 'orders/GET_ORDERS'
    }),
    currentProductsSum() {
      let sum = 0;
      this.currentOrderProducts.forEach(product => {
        sum += (product.discount_price || product.cost) * product.count
      })

      return sum
    }
  },
}
</script>

<style lang="sass">
@import '@/layouts/mixins.sass'
#v-eye-form
  z-index: 2
.v-eye-form__container__block
  background-color: white
  width: 90%
  height: 387px
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  position: absolute
  display: flex
  flex-direction: column
  @include phones
    width: 99%
    top: 45%
  &__closeIcon
    align-self: flex-end
    margin-right: 10px
    margin-top: 10px
    cursor: pointer
  &__card-container
    position: relative
    margin-top: 10px
    flex: 1 0 0
    max-height: 300px
    overflow: auto

    &__card
      // border: 2px solid #BAB4B4
      border-right: none
      border-left: none
      // padding: 24px 30px
      justify-content: space-between
      align-items: center
      display: flex
      width: 100%
      flex-direction: column
      .v-cart__table-item
        width: 100%
        &__inside
          width: 100%
          max-width: none
          border-right: none
          border-left: none
        &__garbage
          display: none
        &:last-child
          border-bottom: 2px solid #BAB4B4

  &__sum
    text-align: right
    width: 100%
    padding: 10px
    font-size: 16px
    span
      font-weight: bold
      font-size: 20px
      color: $red

#v-eye-form > div > div > div.v-eye-form__container__block__card-container > div > div > div.v-cart__table-item__inside > div.v-cart__table-item__top > a > div
  width: 80px

#v-eye-form > div > div > div.v-eye-form__container__block__card-container > div > div > div.v-cart__table-item__inside
  @include phones
    margin: 0
    border-bottom: none
#v-eye-form > div > div > div.v-eye-form__container__block__card-container > div > div > div.v-cart__table-item__inside > div.v-cart__table-item__footer > div.v-cart__table-item__footer__right > div.v-cart__table-item__footer-counter,
#v-eye-form > div > div > div.v-eye-form__container__block__card-container > div > div > div.v-cart__table-item__inside > div.v-cart__table-item__footer > div.v-cart__table-item__footer__right > div.v-cart__table-item__footer-garbage
  @include phones
    display: none
.v-eye-form__container__block__card-orderNumber
  margin-left: 10px
</style>

