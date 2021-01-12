<template lang="pug">
  #v-popup
    .v-popup-wrapper(ref="popupWrapper" @click="closePopup")
    form.v-popup(@submit.prevent="callbackHandler")
      .v-popup__header
        img(v-if="nameLeftIcon.length > 0" :src="require(`../../assets/images/icons/${nameLeftIcon}`)")
        .v-popup__header-descWrapper
          span.v-popup__header-title {{ popupTitle }}
          span.v-popup__header-desc {{ popupDescription }}
        img.v-popup__header-closeIcon(
          :src="require('../../assets/images/icons/close_mark.svg')"
          title="Закрыть окно"
          alt="Закрыть"
          @click="closePopup")
      .v-popup__content
        slot
      .v-popup__footer(v-if="popupSubmitButtonLabel || !popupSubmitButtonLabel == 'false'")
        button.popup-submit {{ popupSubmitButtonLabel }}
</template>

<script>
import popupMixin from '@/components/popup/mixins/popupMixin';

export default {
  name: 'Popup',
  props: {
    /**
     * Подпись кнопки. Передавай false, если кнопка не нужна
     */
    popupSubmitButtonLabel: {
      type: [String, Boolean],
      default: 'Отправить'
    },
  },

  methods: {
    callbackHandler() {
      this.$emit('callbackhandler')
    }
  },
  mixins: [popupMixin]
}
</script>

<style lang="sass" scoped>
@import '@/layouts/mixins.sass'

#v-popup
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
  width: 100vw
  height: 100vh
  z-index: 20 !important
  display: flex
  align-items: center
  justify-content: center
.v-popup-wrapper
  background-color: rgba(0, 0, 0, .46)
  position: fixed
  display: flex
  align-items: center
  justify-content: center
  left: 0
  top: 0
  right: 0
  bottom: 0
  width: 100vw
  height: 100vh
  z-index: 2000
  tra
.v-popup
  padding: 10px
  position: fixed
  z-index: 2001
  background: #fff
  border: 10px solid $gray-1
  max-width: 486px
  left: 50%
  top: 50%
  transform: translate(-50%,-50%)
  height: auto
  @include phones
    margin: 10px
    padding: 0
    border: 5px solid $gray-1
  &__header
    display: flex
    justify-content: space-between
    align-items: flex-start
    padding: 0px 5px
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
      margin-top: 5px
      cursor: pointer
    img:first-child
      // margin-top: 12px
  &__content
    display: flex
    justify-content: center
    flex-direction: column
    margin-top: 15px
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
</style>
