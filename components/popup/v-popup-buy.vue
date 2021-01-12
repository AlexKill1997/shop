<template lang="pug">
.v-popup__buy
  .v-popup-wrapper(ref="popupWrapper" @click="closePopup")
  .v-popup
    .v-popup__header
      svg(width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg")
        path(d="M23.9577 22.9167L37.2493 34.1042L35.416 34.4792L34.0827 34.7292C32.7702 35 32.0202 36.4583 32.6035 37.6458L33.166 38.8542L35.9993 44.9792L33.041 46.3542L30.2077 40.25L29.666 39.0417C29.1035 37.8125 27.541 37.4375 26.4993 38.2917L25.4368 39.125L23.9577 40.3125V22.9167ZM22.416 18.1042C21.9961 18.1042 21.5934 18.271 21.2964 18.5679C20.9995 18.8648 20.8327 19.2676 20.8327 19.6875V43.5417C20.8327 44.4167 21.541 45.125 22.416 45.125C22.8118 45.125 23.1452 45 23.416 44.7917L27.3952 41.5625L30.8535 49.1042C31.1243 49.6667 31.6868 50 32.291 50C32.5202 50 32.7493 50 32.9785 49.8333L38.7285 47.1667C39.5202 46.7917 39.8952 45.8333 39.4785 45.0625L35.9993 37.5L41.0202 36.5625C41.3535 36.4583 41.666 36.3125 41.916 36.0208C42.4785 35.3542 42.3952 34.375 41.666 33.7708L23.4577 18.4583L23.4368 18.4792C23.166 18.25 22.8118 18.1042 22.416 18.1042ZM31.2493 20.8333V16.6667H41.666V20.8333H31.2493ZM28.8118 9.91667L34.7077 4.02083L37.6452 6.95833L31.7493 12.8542L28.8118 9.91667ZM20.8327 0H24.9993V10.4167H20.8327V0ZM8.18685 30.5417L14.0827 24.6458L17.0202 27.5833L11.1243 33.4792L8.18685 30.5417ZM8.18685 6.95833L11.1243 4.02083L17.0202 9.91667L14.0827 12.8542L8.18685 6.95833ZM14.5827 20.8333H4.16602V16.6667H14.5827V20.8333Z" fill="#dc0606")
      .v-popup__header-descWrapper
        span.v-popup__header-title Заказать в один клик
        span.v-popup__header-desc Заполните форму для быстрого заказа
      img.v-popup__header-closeIcon(
          :src="require('../../assets/images/icons/close_mark.svg')"
          title="Закрыть окно"
          alt="Закрыть"
          @click="closePopup"
      )
    form.v-popup__content(@submit.prevent="orderClickHandler")
      .popupInputGroup__header-payment-request
        label(for="Payment_Name") Ваше имя
          span.redAsterisk
        input(
          type="text"
          placeholder="Иванов Иван Иванович"
          v-model="name"
          ref="name"
          required)
      .popupInputGroup__header-payment-request
        label(for="Payment_Phone") Телефон
          span.redAsterisk
        input#Payment_Phone(
          type="phone"
          placeholder="+7 (999) 123-45-67"
          ref="phone"
          v-model="phone"
          v-maska="['+# ### ### ## ##', '+### ### ## ## ##']"
          minLength="12"
          required
        )
      .popupInputGroup__header-payment-request
        label(for="Payment_comment") Комментарий
        textarea#Payment_comment(
          type="text"
          placeholder="Здесь вы можете описать свои комментарии к заказу"
          ref="comment"
          v-model="comment")
      .popupInputGroup__header-payment-request
        p
          span.redAsterisk
          | &nbsp; - поля обязательные для заполнения

      .v-itemSmall
        itemPreview(:item="item" :key="item.id")

      .v-popup__content__checkbox-group
        input#buy(
          type="checkbox"
          v-model="orderAgree"
        )
        label(for="buy")
          | Я&nbsp;даю свое
          span.fontBold &nbsp;согласие на&nbsp;обработку
          | &nbsp;моих персональных данных.

      //- .v-popup__content__checkbox-group
      //-   input#news(
      //-     type="checkbox"
      //-     v-model="subNews"
      //-   )
      //-   label(for="news") Подписаться на новости
      //- .v-popup__footer
      button.popup-submit Заказать
</template>

<script>
import {mapActions} from 'vuex'
import itemPreview from '../itemHorizontalSmall'
import { maska } from 'maska'

export default {
  name: 'PopupBuy',
  components: {itemPreview},
  props: {
    popupSubmitButtonLabel: {
      type: [String, Boolean],
      default: 'Отправить'
    },
    item: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    buy: false,
    userData: {
      name: '',
      phone: '',
      comment: '',
      orderAgree: false,
      subNews: false
    }
  }),

  directives: { maska },

  computed: {
    name: {
      get() {
        return this.userData.name
      },

      set(name) {
        name = name.replace(/\d/g, '')
        this.$refs.name.value = name
        this.userData.name = name
      }
    },

    phone: {
      get() {
        return this.userData.phone
      },

      set(phone) {
        this.$refs.phone.value = phone
        this.userData.phone = phone
      }
    },

    comment: {
      get() {
        return this.userData.comment
      },

      set(comment) {
        this.$refs.comment.value = comment
        this.userData.comment = comment
      }
    },

    orderAgree: {
      get() {
        return this.userData.orderAgree
      },

      set(agree) {
        this.userData.orderAgree = agree
      }
    },

    subNews: {
      get() {
        return this.userData.subNews
      },

      set(news) {
        this.userData.subNews = news
      }
    }
  },

  methods: {
    ...mapActions({
      orderClick: 'oneClick/getOrderClick'
    }),
    closePopup() {
      this.$emit('close')
    },
    thankPopup() {
      this.$emit('open')
    },

    summaryCost() {
      return this.item.counter * this.item.cost
    },

    orderClickHandler() {
      const orderClickData = {
        name: this.userData.name,
        phone: this.userData.phone,
        comment: this.userData.comment,
        agree: this.userData.orderAgree,
        news: this.userData.subNews,
        products: [{
          article: this.item.article,
          quantity: this.item.counter
        }]
      }
      this.orderClick(orderClickData)
        this.userData.name = '',
        this.userData.phone = '',
        this.userData.comment = '',
        this.userData.orderAgree = false,
        this.userData.subNews = false

      this.closePopup()
      this.thankPopup()
    }
  },

}
</script>

<style lang="sass" scoped>
@import '@/layouts/mixins.sass'
.v-popup__buy
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  z-index: 2001 !important

  .v-popup-wrapper
    background-color: rgba(0, 0, 0, .46)
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: 2000
  .v-popup
    padding: 10px
    position: fixed
    z-index: 2001
    background: #fff
    border: 10px solid $gray-1
    min-width: 320px
    max-width: 100%
    width: 468px
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    height: fit-content
    @include phones
      width: 95%
      padding: 5px
      border: 5px solid $gray-1
      min-width: 120px
    @media screen and (max-width: 400px) and (max-height: 736px)
      height: 82vh
      overflow: auto

    &__header
      display: flex
      justify-content: space-between
      align-items: flex-start
      padding: 0px 5px
      @include phones
        padding: 0

      &-descWrapper
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        margin: auto
      &-title
        font-size: 18px
        font-weight: bold
        color: $text
        letter-spacing: .07em
      &-desc
        margin-top: 6px
        font-size: 12px
        font-weight: 300
        letter-spacing: .07em
        text-align: center
        max-width: 300px
      &-closeIcon
        position: relative
        top: 8px
        right: 8px
        cursor: pointer
      img:first-child
        margin-top: 12px
    &__content
      display: flex
      justify-content: center
      flex-direction: column
      margin-top: 15px
      &__checkbox-group
        display: flex
        align-items: center
        flex-wrap: wrap
        input
          position: absolute
          left: -9999px
        label
          margin-top: 3px
          font-size: 12px
          font-weight: 300
          line-height: 14px
          letter-spacing: .07em
          cursor: pointer
    &__footer
      display: flex
      justify-content: center
    .popup-submit
      margin-top: 20px
      margin-bottom: 5px
      padding: 8px 56px
      color: $text
      background-color: $yellow
      border: none
      text-transform: uppercase
      font-size: 15px
      font-weight: 700
      cursor: pointer



input[type="checkbox"]:checked,
input[type="checkbox"]:not(:checked)
input[type="radio"]:checked,
input[type="radio"]:not(:checked)
  position: absolute
  left: -9999px


input[type="checkbox"]:checked + label,
input[type="checkbox"]:not(:checked) + label,
    display: inline-block
    position: relative
    padding-left: 28px
    line-height: 20px
    cursor: pointer
    @media screen and( max-width: 480px)
      padding-left: 26px
      line-height: 14px



input[type="checkbox"]:checked + label:before,
input[type="checkbox"]:not(:checked) + label:before,
    content: ""
    position: absolute
    left: 0px
    top: 0px
    width: 20px
    height: 20px
    border: 2px solid #BAB4B4
    background-color: #ffffff


input[type="checkbox"]:checked + label:before,
input[type="checkbox"]:not(:checked) + label:before
    border-radius: 2px

input[type="checkbox"]:checked + label:after,
input[type="checkbox"]:not(:checked) + label:after,
    content: ""
    position: absolute
    -webkit-transition: all 0.2s ease
    -moz-transition: all 0.2s ease
    -o-transition: all 0.2s ease
    transition: all 0.2s ease


input[type="checkbox"]:checked + label:after,
input[type="checkbox"]:not(:checked) + label:after
    left: 3px
    top: 4px
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

input[type="checkbox"]:not(:checked) + label:after,
    opacity: 0

input[type="checkbox"]:checked + label:after,
    opacity: 1


.error
  font-size: 12px
  width: 100%
  padding-left: 27px
  color: #757575
// div.v-popup__buy > div.v-popup > form > div:nth-child(6)
//   height: 56px


#\39 4778 > div.v-popup__buy > div.v-popup > form > div:nth-child(6) > label, #\39 4778 > div.v-popup__buy > div.v-popup > form > div:nth-child(7) > label
  line-height: 24px




#index > div.v-popular-items > div.v-popular-items__list > div:nth-child(3) > div.v-popup__buy > div.v-popup > form > div:nth-child(6)
  height: 56px
</style>
