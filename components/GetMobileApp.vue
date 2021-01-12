<template lang="pug">
  #v-get-mobile-app
    //- .v-get-mobile-app__form-wrapper
    //-   .form-text
    //-     p Скачайте мобильное приложение ТД-ЦСК на ваш смартфон
    //-   span.form-description
    //-     | и получите 1000
    //-     span.form-accent
    //-       | бонусных рублей!
    //-   h4.form-sentence
    //-     | Получите по SMS ссылку на скачивание приложения
    //-   .v-get-mobile-app__form
    //-     input.v-get-mobile-app__form-input(
    //-       type="number",
    //-       placeholder="+7(_) _-_-_"
    //-       )
    //-     .v-get-mobile-app__form-button
    //-       span Получить
    //-   .v-get-mobile-app__store-images
    .app-store
    .play-market

    .v-get-mobile-app__mockup
</template>

<script>
export default {
  name: 'Logistics'
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
#v-get-mobile-app
  display: flex
  align-items: center
  position: relative
  width: 100%
  height: 570px
  // height: calc(26.864vh + 300px)
  margin-top: 87px
  margin-bottom: 22px
  background-image: url('../assets/images/mobile-app--bg1.jpg')
  background-position: 50%
  background-size: cover
  object-fit: cover
  @include tablets
    display: none
.v-get-mobile-app__form-wrapper
  display: block
  height: auto
  width: 580px
  margin-left: 30px
  background-color: $gray-1

.form-text
  display: flex
  justify-content: center
  align-items: center
  padding: 0px 66px
  margin-top: 15px
  font-weight: 700
  text-align: center
  font-size: 24px
  color: $text
  letter-spacing: .07em

.form-description
  display: flex
  justify-content: center
  align-items: center
  margin-top: 5px
  font-weight: 400
  font-size: 18px
  letter-spacing: .07em

.form-accent
  color: $red
  font-weight: 700
  font-size: 18px
  line-height: 21px
  margin-left: 7px

.form-sentence
  display: flex
  justify-content: center
  align-items: center
  margin-top: 15px
  font-weight: 700
  padding: 0px 33px
  font-size: 18px
  letter-spacing: .07em

.v-get-mobile-app__form
  margin-top: 15px
  display: flex
  align-items: center
  justify-content: space-between

.v-get-mobile-app__form-input
  background-color: white
  padding: 12px 28px
  width: 116px
  height: 16px
  border: none
  margin-left: 82px
  outline: none
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button
    -webkit-appearance: none
    margin: 0
input[type=number]
  -moz-appearance: textfield

.v-get-mobile-app__form-button
  display: flex
  justify-content: center
  align-items: center
  background-color: $red
  margin-right: 66px
  padding: 10px 43px
  font-weight: 700
  letter-spacing: .07em
  color: white
  cursor: pointer

.v-get-mobile-app__store-images
  display: inline-flex
  justify-content: space-between
  align-items: center
  margin-top: 30px
  margin-bottom: 15px
  width: 100%

.app-store
  width: 164px
  height: 45px
  background-image: url('~@/assets/images/mobile-app--apple-download.png')
  background-size: cover
  object-fit: cover
  background-position: 50%
  margin-left: 35px
  border-radius: 5px
  margin-bottom: 40px
  align-self: flex-end

.play-market
  width: 166px
  height: 46px
  background-image: url('~@/assets/images/mobile-app--google-download.png')
  background-size: cover
  object-fit: cover
  background-position: 50%
  margin-right: 68px
  align-self: flex-end
  margin-bottom: 40px
  margin-left: 30px

.v-get-mobile-app__mockup
  position: absolute
  width: 326px
  height: 656px
  background-image: url('~@/assets/images/mobile-app--mockap2.png')
  background-size: cover
  background-position: 50%
  right: 0
  margin-right: 170px


</style>
