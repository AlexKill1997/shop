<template lang="pug">
  #v-logistics
    .v-logistics__heading-wrapper
      h2.v-logistics__title Развитая логистика
      img.v-main-map__heading-icon(src="~@/assets/images/icons/logistic.svg")
    .v-logistics__wrapper
      //- .v-logistics__container
      //-   p.v-logistics__container-text
      //-     span.accent-bold
      //-       | «Торговый дом ЦСК»
      //-     | &nbsp;крупнейший поставщик строительных и&nbsp;отделочных материалов

      //-   p.v-logistics__container-text
      //-     | Более
      //-     span.accent-bold
      //-       | &nbsp;50&nbsp;единиц
      //-     |&nbsp;разнотонажного автотранспорта

      //-   p.v-logistics__container-text
      //-     span.accent-bold
      //-       | Ежедневно&nbsp;
      //-     | мы доставляем несколько сотен заказов,
      //-     | а&nbsp;за&nbsp;год перевозим млн тонн грузов.

      //-   p.v-logistics__container-text.accent-red
      //-       | Всегда к&nbsp;Вашим услугам!

      //-   p.v-logistics__container-text
      //-     | Привезем заказ в&nbsp;
      //-     span.accent-bold
      //-       | удобное место
      //-     |&nbsp;и&nbsp;
      //-     span.accent-bold
      //-       | точно в&nbsp;срок!
      //-   .v-logistics__container-conditions
      //-     div
      //-       span Условия доставки
</template>

<script>
export default {
  name: 'Logistics'
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
#v-logistics
  margin-top: 0
  position: relative
  @include tablets
    display: none
.v-logistics__heading-wrapper
  padding: 15px 0px
  background-image: url('~@/assets/images/divider.png')
  background-position: 0% 50%
  background-repeat: no-repeat
  transform: matrix(-1, 0, 0, 1, 0, 0)
  display: flex
  margin: 0 20px
  flex-direction: row-reverse
  justify-content: center
  background-size: contain
  @media screen and(max-width: 1200px)
    background-image: url('~@/assets/images/divider3.png')
  @media screen and(max-width: 1000px)
    background-position: 25% 50%
.v-logistics__title
  background-position: 50% 50%
  background-repeat: no-repeat
  padding: 16px 0px
  margin-bottom: 20px
  font-weight: 700
  font-size: calc(14px + (24 - 14) * ((100vw - 320px) / (1920 - 320)))
  text-align: center
  letter-spacing: .07em
  color: white
  text-transform: uppercase
  transform: matrix(-1, 0, 0, 1, 0, 0)
  &-icon
    margin-right: 15px
    align-self: center

.v-logistics__wrapper
  $pd-top: 107px
  width: 100%
  height: 570px
  background-image: url('~@/assets/images/logistics--bg.jpg')
  background-size: cover
  background-position: center
  background-repeat: no-repeat
  padding-top: $pd-top
.v-logistics__container
  display: block
  height: auto
  width: 580px
  margin-left: 30px
  background-color: $gray-1
  border: 5px solid #D0D0D0
  &-text
    font-weight: 400
    font-size: 18px
    text-align: center
    color: $text
    letter-spacing: .07em
    &:nth-child(1)
      margin-top: 20px
      padding: 0px 56px
    &:nth-child(2)
      margin-top: 12px
      padding: 0px 130px
    &:nth-child(3)
      margin-top: 20px
      padding: 0px 36px
  &-conditions
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 20px
    div
      margin-top: 24px
      padding: 10px 34px
      font-weight: 700
      color: white
      text-transform: uppercase
      background-color: $red
      cursor: pointer

.accent-bold
  font-weight: 700
.accent-red
  font-weight: 700
  color: $red
</style>
