<template lang="pug">
  vBasePopup(
    @close='closePopup',
    :popupTitle='"Заявка на бесплатный расчёт"',
    :popupDescription='"Оставьте Ваши данные и коментарии наши менеджеры свяжутся с Вами"',
    :nameLeftIcon='"pencil-writing-on-a-paper-sheet.svg"',
    :popupWidth='460'
  )
    template(v-slot:header)
      svg(width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg")
        path(d="M23.9577 22.9167L37.2493 34.1042L35.416 34.4792L34.0827 34.7292C32.7702 35 32.0202 36.4583 32.6035 37.6458L33.166 38.8542L35.9993 44.9792L33.041 46.3542L30.2077 40.25L29.666 39.0417C29.1035 37.8125 27.541 37.4375 26.4993 38.2917L25.4368 39.125L23.9577 40.3125V22.9167ZM22.416 18.1042C21.9961 18.1042 21.5934 18.271 21.2964 18.5679C20.9995 18.8648 20.8327 19.2676 20.8327 19.6875V43.5417C20.8327 44.4167 21.541 45.125 22.416 45.125C22.8118 45.125 23.1452 45 23.416 44.7917L27.3952 41.5625L30.8535 49.1042C31.1243 49.6667 31.6868 50 32.291 50C32.5202 50 32.7493 50 32.9785 49.8333L38.7285 47.1667C39.5202 46.7917 39.8952 45.8333 39.4785 45.0625L35.9993 37.5L41.0202 36.5625C41.3535 36.4583 41.666 36.3125 41.916 36.0208C42.4785 35.3542 42.3952 34.375 41.666 33.7708L23.4577 18.4583L23.4368 18.4792C23.166 18.25 22.8118 18.1042 22.416 18.1042ZM31.2493 20.8333V16.6667H41.666V20.8333H31.2493ZM28.8118 9.91667L34.7077 4.02083L37.6452 6.95833L31.7493 12.8542L28.8118 9.91667ZM20.8327 0H24.9993V10.4167H20.8327V0ZM8.18685 30.5417L14.0827 24.6458L17.0202 27.5833L11.1243 33.4792L8.18685 30.5417ZM8.18685 6.95833L11.1243 4.02083L17.0202 9.91667L14.0827 12.8542L8.18685 6.95833ZM14.5827 20.8333H4.16602V16.6667H14.5827V20.8333Z" fill="#dc0606")
      .v-popup__tnank--header-descWrapper
        p.v-popup__tnank--header-title Заявка на бесплатный расчёт успешно оформлена
      img.v-popup__tnank--header-closeIcon(
        :src="require('../../assets/images/icons/close_mark.svg')"
        title="Закрыть окно"
        alt="Закрыть"
        @click="closePopup"
      )
    template
      p наш менеджер свяжется с вами в течении 5 минут!
</template>

<script>
import popupMixin from '@/components/popup/mixins/popupMixin'
import thanksPopupMixin from '@/components/popup/mixins/thanksPopupMixin'

export default {
  name: "ConsumptionThanksPopup",
  mixins: [popupMixin, thanksPopupMixin]
}
</script>

<style lang="sass">
@import '@/layouts/mixins.sass'
.v-popup
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
  .v-popup__tnank
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
    @include phones
      width: 95%
      padding: 5px
      border: 5px solid $gray-1
      min-width: 120px
    @media screen and (max-width: 400px) and (max-height: 736px)
      height: 82vh
      overflow: auto
    &--header
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0px 5px
      margin-bottom: 15px
      @include phones
        padding: 0

      &-descWrapper
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        margin: auto
        p
          text-align: center
      &-title
        font-size: 18px
        font-weight: bold
        color: $text
        letter-spacing: .07em
      &-closeIcon
        position: relative
        top: -16px
        right: 0
        cursor: pointer
  &__content__thank
    display: flex
    flex-direction: column
    align-items: center
    p
      margin-bottom: 15px
    .success
      color: black
      border-bottom: 2px dashed black
      cursor: pointer

.free-payment
  text-align: center
</style>
