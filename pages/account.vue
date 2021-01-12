<template lang="pug">
  #v-account
    vBreadcrumbs(:breadcrumbs="breadcrumbs")
    .account__layout(v-if="mobileMenuProfile" @click="mobileMenuProfile=!mobileMenuProfile")
    .v-account__wrapper
      h1.v-account__header Личный кабинет:
      .v-account__container__content
        ul.v-account__container__list
          li.v-account__container__choice(@click="switchView('vForm')")
            p ДАННЫЕ УЧЁТНОЙ ЗАПИСИ
            img.v-account__container__choice-icon(:src="require('@/assets/images/items/arrow-circle1.svg')")
          li.v-account__container__choice(@click="switchView('vProfile')")
            p МОЙ ПРОФИЛЬ
            img.v-account__container__choice-icon(:src="require('@/assets/images/items/arrow-circle1.svg')")
          li.v-account__container__choice.order-number(@click="switchView('vOrders')")
            span МОИ ЗАКАЗЫ 
              span.counter ({{ COUNT }})
            img.v-account__container__choice-icon(:src="require('@/assets/images/items/arrow-circle1.svg')")
          li.v-account__container__choice(@click="switchView('vFavourite')")
            p ИЗБРАННОЕ
            img.v-account__container__choice-icon(:src="require('@/assets/images/items/arrow-circle1.svg')")
        .v-account__container__menu-choice(v-for="ac in personalAc" @click="mobileMenuProfile=!mobileMenuProfile")
          .v-account__container__menu-choice__choosen(v-show="ac.id===currentNumber")
            span {{ac.name}}
            img.v-account__container__menu-choice-icon(:src="require('@/assets/images/items/arrow-circle1.svg')")

        ul.v-account__container__mobile-menu(v-if="mobileMenuProfile" @click="mobileMenuProfile=!mobileMenuProfile")
          li.v-account__container__mobile-menu__choice(@click="switchMobile(1);switchView('vForm')")
            p ДАННЫЕ УЧЁТНОЙ ЗАПИСИ
          li.v-account__container__mobile-menu__choice(@click="switchMobile(2);switchView('vProfile')")
            p МОЙ ПРОФИЛЬ
          li.v-account__container__mobile-menu__choice(@click="switchMobile(3);switchView('vOrders')")
            p МОИ ЗАКАЗЫ
          li.v-account__container__mobile-menu__choice(@click="switchMobile(4);switchView('vFavourite')")
            p ИЗБРАННОЕ
        .v-account__container__content__greyback
          Component(:is='currentView')
        .v-account__container__content__spec
          SpecialOffers(
          :specialOffers="specialOffers")

</template>
<script>
import { mapGetters } from 'vuex'
import vBreadcrumbs from '@/components/breadcrumbs.vue'
import vForm from '@/components/FormAccount.vue'
import vProfile from '@/components/Profile.vue'
import vOrders from '@/components/Orders.vue'
import vFavourite from '@/pages/favorites.vue'
import SpecialOffers from '@/components/SpecialOffers.vue'

export default {
name: 'Account',
middleware: ['authenticated', 'orders'],
  components: {
    vBreadcrumbs,
    vForm,
    vProfile,
    vOrders,
    vFavourite,
    SpecialOffers
  },
  data: () => ({
  currentView: 'vForm',
  currentNumber: 1,
  mobileMenuProfile: false,
  personalAc:[
    {
    id: 1,
    name: 'ДАННЫЕ УЧЁТНОЙ ЗАПИСИ'
    },
    {
    id: 2,
    name: 'МОЙ ПРОФИЛЬ'
    },
    {
    id: 3,
    name: 'МОИ ЗАКАЗЫ'
    },
    {
    id: 4,
    name: 'ИЗБРАННОЕ'
    }
  ],
  breadcrumbs: [
    {
      text: 'Главная',
      link: "/"
    },
    {
      text: 'Личный кабинет'
    },
  ],
  specialOffers: [
    {
      id: 1,
      type: 'Скидка',
      description: 'Акция Knauf: «Открывай Россию вместе с KNAUF»',
      image: 'offer-1.jpg'
    },
    {
      id: 2,
      type: 'Акция',
      description: 'На теплоизоляционные плиты',
      image: 'offer-3.jpg'
    }
  ]
  }),
  computed: {
    ...mapGetters({
      ORDERS: 'orders/GET_ORDERS',
      COUNT: 'orders/GET_ORDERS_COUNTER',
    })
  },
  methods:{
    switchView(view){
      this.currentView = view
    },
    switchMobile(number){
      this.currentNumber = number
    }
  }
}
</script>
<style lang="sass">
@import '@/layouts/mixins.sass'
.account__layout
  width: 100vw
  height: 100vh
  position: fixed
  background-color: rgba(0, 0, 0, 0.46)
  z-index: 110
  top: 0
.v-account__wrapper
  padding: 15px 45px 50px
  @include phones
    padding: 15px 23px 15px 23px
  @media screen and(max-width: 420px)
    padding: 15px 8px 15px 8px
  @media screen and(max-width: 330px)
    padding: 15px 4px 15px 4px
  .v-account__header
    font-size: 24px
    @include phones
      display: none
  .v-account__container__content
    display: flex
    justify-content: space-between
    margin-top: 15px
    @include phones
      flex-direction: column
      margin-top: 0
    .v-account__container__list
      margin: 0
      margin-right: 10px
      padding: 22px
      border: 2px solid #BAB4B4
      height: fit-content
      width: 15%
      min-width: 285px
      @include largelaptop
        width: auto

      @include phones
        display: none
      &:last-child
        background: $red
      .v-account__container__choice
        display: flex
        justify-content: space-between
        padding: 10px 0
        border-bottom: 2px solid #BAB4B4
        font-size: 14px
        font-weight: bold
        cursor: pointer
        align-items: center
        &-icon
          transform: rotate(-90deg)
          width: 20px
          height: 20px
        p
          margin-right: 28px
      .order-number
        justify-content: space-between
        .counter 
          color: $red
          font-weight: bold
          font-size: 17px
    .v-account__container__menu-choice
      display: none
      @include phones
        display: flex

      &__choosen
        width: 100%
        display: flex
        align-items: center
        justify-content: space-between
        margin-bottom: 10px
      &-icon
        transform: rotate(-90deg)
    .v-account__container__mobile-menu
      display: none
      @include phones
        display: block
        position: fixed
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
        z-index: 10
        background-color: white
        margin: 0
        padding: 0 25px
        border: 2px solid #BAB4B4
        width: 70%
        z-index: 111
      p
        padding: 10px 0
        font-size: 14px
        text-align: center
      &__choice
        list-style-type: none
        margin: 0
        padding: 0
        border-bottom: 2px solid #BAB4B4
      &__choice:last-child
        border-bottom: none
    &__greyback
      min-height: 588px
      border: 2px solid #BAB4B4
      width: 70%
      position: relative
      @include largelaptop
        width: 1067px
      @include phones
        min-height:  inherit
        width: inherit
        background-color: white
        border: none
      .v-favorites
        height: 100%
        padding: 30px 0
        display: flex
        flex-direction: column
        @include phones
          flex-direction: column-reverse
          padding: 0
        h1
          margin: 0
          padding-left: 80px
          margin-bottom: 30px
        .container-for-favorites
          max-height: 425px
          overflow: auto
          @include phones
            max-height: inherit
        .v-favorites__total
          align-items: flex-end
    &__spec
      height: 100%
      max-width: 417px
      @media screen and(max-width: 1380px)
        display: none
      @include largelaptop
        margin-left: 10px
      @include phones
        display: none
      .special-offers
        width: auto
        .special-offers__wrapper

          display: flex !important
          padding-left: 0
          .special-offers__item
            height: inherit

.v-account__container__choice:last-child
  border-bottom: none !important

#v-favotites
  padding: 20px
  @include phones
    padding: 0
.v-account__wrapper .v-account__container__content__greyback .v-favorites h1
  padding: 0
  font-size: 20px

#v-favotites > div.v-favorites__total > div > p > strong
  @media screen and(max-width: 330px)
    font-size: 18px

</style>
