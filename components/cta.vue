<template lang="pug">
div
  .v-cta
    img.v-cta__image(:src="require('../assets/images/icons/check-clipart-right-sign.png')")
    span.v-cta__description Не нашли что искали?
    .v-cta__form
      h5.v-cta__form-heading Оставьте заявку:
      .v-cta__form-input-wrapper
        form(@submit.prevent="callbackHandler")
          .container_for_input
            .container_for_input__wrap
              input.v-cta__form-input(
                type="text"
                placeholder="Имя"
                v-model="callName"
                ref="callname"
                required
                )
            .container_for_input__wrap
              input.v-cta__form-input(
                type="phone"
                placeholder="+7 (999) 123-45-67"
                v-model="callNumber"
                ref="callnumber"
                v-maska="['+# ### ### ## ##', '+### ### ## ## ##']"
                required
                )
          button.v-cta__form-submit(type="submit") Позвонить мне!
    ul.v-cta__advantages
      li.v-cta__advantages-item
        span Найдем&nbsp;&ndash; #[span.v-cta__advantages-item-accent быстро.]
      li.v-cta__advantages-item
        span Договоримся&nbsp;&ndash; #[span.v-cta__advantages-item-accent выгодно.]
      li.v-cta__advantages-item
        span Поставим&nbsp;&ndash; #[span.v-cta__advantages-item-accent в срок!]

  vPopupThank(v-if="isThankPopupVisible" @close="closePopup")
</template>

<script>
import {mapActions} from 'vuex'
import vPopupThank from '@/components/popup/v-thank-popup'
import { maska } from 'maska'
export default {
  name: 'cta',
  components: {vPopupThank},
  data: () => ({
    callBackUser: {
      name: '',
      phone: ''
    },
    isThankPopupVisible: false
  }),
  directives: { maska },

  computed: {
    callName: {
      get() {
        return this.callBackUser.name
      },
      set(name) {
        name = name.replace(/\d/g, '')
        this.$refs.callname.value = name
        this.callBackUser.name = name
      }
    },

    callNumber: {
      get() {
        return this.callBackUser.phone
      },

      set(phone) {
        this.$refs.callnumber.value = phone,
        this.callBackUser.phone = phone
      }
    }
  },

  methods: {
    ...mapActions({
      callBackSendUser: 'callback/sendFooterCallBackUser'
    }),
    callbackHandler() {
      const callBackData = {
        name: this.callBackUser.name,
        phone: this.callBackUser.phone
      }
      this.callBackSendUser(callBackData)
      this.isThankPopupVisible = true
      this.callBackUser.name = ''
      this.callBackUser.phone = ''
    },
    closePopup() {
      this.isThankPopupVisible = false
    },
  }
}
</script>

<style lang="sass" scoped>
@import '../layouts/mixins.sass'

$padding-top: 21px
$padding-right: 30px
$padding-bottom: $padding-top
$padding-left: 116px

.v-cta
  display: flex
  justify-content: space-between
  padding: 21px 30px 21px 110px
  align-items: center
  background-color: $gray-1

  @include laptop
    width: 100%
    display: flex
    flex-direction: column
    padding: 15px 10px
  @include phones
    display: none
  &__image
    @include laptop
  &__description
    display: inline-block
    font-size: 24px
    font-weight: 400
    letter-spacing: .07em
    font-weight: bold
  &__form
    display: flex
    align-items: center
    @include tablets
      flex-direction: column
      justify-content: stretch
    &-heading
      font-size: 16px
      font-weight: 700
      letter-spacing: .07em
      color: $text
      margin-right: 50px
    &-input-wrapper
      display: flex
      flex-direction: column
      margin-right: -4.395833vw
      @include tablets
        margin: 0 0 10px 0
        width: 100%
      input::placeholder
        font-weight: bold
    &-input
      padding: 10px 22px
      border: 2px solid $gray-4
      font-size: 14px
      &:first-child
        margin-bottom: 5px
      &:active, &:focus
        outline-color: $red
      .error
        display: flex
        justify-content: flex-end
        span
          padding-right: 66px
          @include phones
            padding-right: 100px
    &-submit
      padding: 10px 40px
      border: none
      background-color: $red
      font-size: 16px
      font-weight: 700
      color: white
      text-transform: uppercase
      cursor: pointer
      transition: all .15s ease
      height: fit-content
      &:hover
        background-color: darken($red, 7%)
        box-shadow: 0px 6px 8px rgba($text, .1)

  &__advantages
    list-style: none
    padding-left: 0
    @include laptop
      margin: unset
      padding: 10px 0 0 0
    &-item
      text-align: right
      font-size: 24px
      letter-spacing: .07em
      @include laptop
        text-align: center
      span
        font-weight: bold
      &:not(:last-child)
        margin-bottom: 5px
      &-accent
        color: $red
        font-weight: 700


input.v-cta__form-input
  -webkit-appearance: none
  border-radius: 0
.error
  font-size: 12px
  color: #757575
  width: 100%
  span
    font-weight: 300 !important

.container_for_input
  display: flex
  flex-direction: column
  margin-right: 50px
form
  display: flex
  align-items: center


</style>
