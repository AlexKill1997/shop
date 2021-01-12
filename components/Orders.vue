<template lang="pug">
  #v-orders
    form.v-orders__container__form
      h2.v-orders__container__form__header Мои заказы:
      table.v-orders__container__form__table(v-if="orders.length > 0")
        tbody
          tr.v-orders__container__form__table__row
            th.v-orders__container__form__table__date Дата
            th.v-orders__container__form__table__number Номер заказа
            th.v-orders__container__form__table__address Адрес доставки
            th.v-orders__container__form__table__status Статус
          tr.v-orders__container__form__table__row-empty
          tr.v-orders__container__form__table__row(v-for="(order, index) in orders")
            td.v-orders__container__form__table__date {{ order.createdDate }}
            td.v-orders__container__form__table__number 
              span {{ order.number }}
              span(@click="eyeHandler(index)") {{ order.number }}
            td.v-orders__container__form__table__address {{ order.address }}
            td.v-orders__container__form__table__status(:class="[`v-orders__container__form__table__status--color--${getStatusColor(order)}`]") {{ order.status.title }}
            td.v-orders__container__form__table__eyes
              img.v-orders__container__form__table__address-icon(@click="eyeHandler(index)" :src="require('@/assets/images/icons/eye.svg')")
      .v-orders__container__form__empty(v-if="orders.length < 1")
        h1 Список заказов пуст!
    .v-orders__container__layout(v-if="isEye" @click="isEye=!isEye")
    vEyeForm(v-if="isEye" @closeEyeForm="isEye=!isEye")
    .v-orders__container__footer(v-if="orders.length > 0")
      .v-orders__container__footer__summary
          img(:src="require('@/assets/images/items/summary-bg.png')")
          .v-orders__container__footer__summary-wrapper
            h6.v-orders__container__footer__summary-wrapper-title Итого:&nbsp;
            span.v-orders__container__footer__summary-wrapper-value.ruble {{ (amount).toFixed(2) }} &#8381;
      .v-orders__container__footer__buttons
        Paginate(:pagesCount="orderPagesCount" @paginate="paginationOrdersHandler($event)")
        //- span.v-orders__container__footer-btn Показать еще
        nuxtLink(to='/catalog' ).v-orders__container__footer-btn Перейти в каталог товаров
        nuxtLink(to='/cart' ).v-orders__container__footer-btn Собрать заказ

</template>

<script>
import vEyeForm from '@/components/popup/EyeForm'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Paginate from '@/components/partials/pagination'
export default {
  components:{
    vEyeForm,
    Paginate
  },
  data:()=>({
    isEye: false

    }),
    computed: {
      ...mapGetters({
        ordersSummary: 'orders/GET_SUMMARY',
        orders: 'orders/GET_ORDERS',
        currentOrder: 'orders/GET_CURRENT_ORDER',
        pageNumber: 'orders/GET_PAGE_NUMBER',
        limit: 'orders/GET_LIMIT',
        count: 'orders/GET_ORDERS_COUNTER',
        amount: 'orders/GET_AMOUNT'
      }),
      

      orderPagesCount() {
        const iterator = Math.ceil(this.count / this.limit)
        const array = []

        for (let i = 0; i < iterator; i++) {
          array.push(i + 1)
        }

        return array
      },
    },
  methods:{
    ...mapMutations({
      setCurrentOrderIndex: 'orders/SET_CURRENT_ORDER_INDEX',
      setPageNumber: 'product/SET_PAGE_NUMBER'
    }),
    ...mapActions({
      getOrders: 'orders/getOrders'
    }),
    eyeHandler(index) {
      this.setCurrentOrderIndex(index)
      this.isEye = true
    },
    getStatusColor(order) {
      let statusColors = {
        nocall: 'black',
        declained: 'red',
        awaiting: 'orange',
        completed: 'green'
      }
      return statusColors[order.status.value]
    },

    paginationOrdersHandler(page) {
      let tmpPage;
      if (typeof page === 'string') {
        switch (page) {
          case 'back': 
            tmpPage = this.pageNumber - 1
            break
          case 'forward': 
            tmpPage = this.pageNumber + 1
            break
        }
      } else {
        tmpPage = page;
      }

      this.getOrders({
        query: {
          page: tmpPage
        }
      })
      .then(() => this.setPageNumber(tmpPage))
    }
  }

}

</script>
<style lang="sass">
@import '@/layouts/mixins.sass'
#v-orders
  height: 100%
  display: flex
  flex-direction: column

.v-orders__container__form
  padding: 20px
  flex: 1 0 0
  @include phones
    padding: 0
    margin-top: 15px
  &__empty
    display: flex
    height: 80%
    width: 100%
    align-items: center
    justify-content: center
    @include phones
      margin-top: 137px
    h1
      border: 2px dashed $red
      color: $red
      padding: 15px
      font-size: 24px
      margin: 0
      height: fit-content
      @include phones
        font-size: 20px
  &__header
    font-size: 20px
    margin: 0

    @include phones
      display: none
  &__table
    table-layout: fixed
    border-collapse: collapse
    width: 100%
    margin-top: 16px
    @media screen and(max-width: 2225px)
      width: inherit
    @media screen and(max-width: 1500px)
      // width: 605px
      // overflow: hidden
    &__row-empty
      border: none
      height: 10px
    &__row:nth-child(1)
      border-right: 2px solid transparent 
      border-left: 2px solid transparent  
    &__row
      height: 40px

      th
        border: none !important
        @include phones
          // display: none
          font-size: 12px
      th:nth-child(1)
        width: 10%
        @include phones
          width: 18%
        @media screen and(max-width: 374px)
          width: 18%
      th:nth-child(2)
        width: 20%
        @include phones
          width: 12%
        @media screen and(max-width: 374px)
          width: 13%
      th:nth-child(3)
        width: 47%
        @include phones
          width: 52%
        @media screen and(max-width: 374px)
          width: 47%

      th:nth-child(4)

        width: 21%
        @include phones
          width: 16%
        @media screen and(max-width: 374px)
          width: 18%
      .v-orders__container__form__table__date,
      .v-orders__container__form__table__number,.v-orders__container__form__table__address, .v-orders__container__form__table__status
        border: 2px solid #BAB4B4
        text-align: center
      .v-orders__container__form__table__number
        span:nth-child(1)
          @include phones
            display: none
        span:nth-child(2)
          display: none
          @include phones
            display: block
            text-decoration: underline
      td
        @include phones
          font-size: 12px
      .v-orders__container__form__table__eyes
        @include phones
          display: none
        img
          margin-left: 5px
          cursor: pointer
          height: 20px
          @include phones
            display: none
// .v-orders__container__layout
//   background: rgba(0, 0, 0, 0.46)
.v-orders__container__footer
  display: flex
  flex-direction: column
  align-items: flex-end
  @include phones
    padding: 0
    margin-top: 20px
  &__buttons
    display: flex
    width: 100%
    padding: 20px
    align-items: center
    justify-content: space-between
    @include phones
      flex-direction: column
  &-btn
    background: $red
    padding: 11px 40px
    color: white
    font-weight: bold
    cursor: pointer
    text-decoration: none
    @include phones
      padding: 7px 26px
      font-size: 13px
      width: 100%
      text-align: center
      margin-bottom: 20px
      font-size: 14px
    &:last-child
      margin-bottom: 0 !important

  &__summary
    width: 296px
    display: block
    position: relative
    padding-right: 20px
    @include phones
      width: 182px
      padding-right: 0
    img
      width: 100%
    &-wrapper
      position: absolute
      top: 30%
      right: 45%
      font-weight: bold
      color: white
      font-size: 20px
      text-align: center
      @include phones
        font-size: 13px
      &-title
        margin: 0
        text-align: center
        font-size: 18px
        @include phones
          font-size: 13px



.v-orders__container__layout
  background: rgba(0, 0, 0, 0.46)
  width: 100%
  height: 100%
  position: absolute
  right: 0
  top: 0
  z-index: 1

td
  font-size: 14px
tbody
  font-size: 14px

.v-orders__container__form__table__status
  font-size: 14px
  &--color-
    &-orange
      color: #FFB400
    &-green
      color: #06d6a0
    &-red
      color: $red
    &-black
      color: #ADB0B3


</style>
