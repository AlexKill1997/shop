<template lang="pug">
  #v-advantages
    .v-advantages__heading-wrapper
      h2.v-advantages__title ПОЧЕМУ ТОРГОВЫЙ ДОМ «ЦСК»
      img.v-main-map__heading-icon(src="~@/assets/images/icons/why.svg" alt="why")
    ul.v-advantages__list
      li.v-advantages__list-item
        img.v-advantages__list-image(src="~@/assets/images/icons/adv-goods.svg" alt="goods")
        p.v-advantages__list-desc Более
          span.v-advantages__bold 100 тыс
          span.v-advantages__accent товаров

      li.v-advantages__list-item
        img.v-advantages__list-image(src="~@/assets/images/icons/adv-sales.svg" alt="sales")
        .v-advantages__list-desc Лучшие
          span.v-advantages__accent Цены
      li.v-advantages__list-item
        img.v-advantages__list-image(src="~@/assets/images/icons/adv-clubcard.svg" alt="clubcard")
        .v-advantages__list-desc Клубные
          span.v-advantages__accent карты
      li.v-advantages__list-item
        img.v-advantages__list-image(src="~@/assets/images/icons/adv-logistics.svg" alt="logistics")
        .v-advantages__list-desc Развитая
          span.v-advantages__accent логистика
      li.v-advantages__list-item
        img.v-advantages__list-image(src="~@/assets/images/icons/adv-moneypiggy.svg" alt="moneypiggy")
        .v-advantages__list-desc Бонусные
          span.v-advantages__accent рубли

</template>

<script>
export default {
  name: 'Advantages'
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
#v-advantages
  @include tablets
    display: none
.v-advantages

  &__heading-wrapper
    padding: 15px 0px
    background-image: url('~@/assets/images/divider.png')
    background-position: 0% 50%
    background-repeat: no-repeat
    transform: matrix(-1, 0, 0, 1, 0, 0)
    display: flex
    flex-direction: row-reverse
    justify-content: center
    margin: 0 20px
    background-size: contain
    @media screen and(max-width: 1200px)
      background-image: url('~@/assets/images/divider3.png')
    @media screen and(max-width: 1000px)
      background-position: 25% 50%
  &__title
    background-position: 50% 50%
    background-repeat: no-repeat
    font-weight: 700
    font-size: calc(14px + (24 - 14) * ((100vw - 320px) / (1920 - 320)))
    text-align: center
    letter-spacing: .07em
    color: white
    transform: matrix(-1, 0, 0, 1, 0, 0)
    &-icon
      margin-right: 15px
      align-self: center
      transform: matrix(-1, 0, 0, 1, 0, 0)
  &__list
    display: flex
    margin: 30px 110px
    justify-content: center
    @include largelaptop
      display: flex
      justify-content: center
      flex-wrap: wrap
    &-item
      display: flex
      align-items: center
      @include largelaptop
        min-width: 260px
        max-width: 300px
        margin: 0 10px
      @include mediumlaptop
        margin: 10px
    &-desc
      display:
      margin-left: 10px
      margin-right: 30px
      font-weight: 400
      font-size: 22px
      letter-spacing: .07em
      text-align: center
  &__accent
    display: inline-block
    margin: 0px 6px
    font-weight: 700
    font-size: 22px
    color: $red
    letter-spacing: .07em
    text-transform: uppercase
  &__bold
    font-weight: 700
</style>
