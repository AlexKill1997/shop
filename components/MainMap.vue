<template lang="pug">
  #v-main-map
    .v-main-map
      .v-main-map__heading-wrapper
        h2.v-main-map__heading Мы не стоим на месте, постоянно развиваемся!
        img.v-main-map__heading-icon(src="~@/assets/images/icons/grow.svg")
      .v-main-map__container
        yandexMap
</template>

<script>
import yandexMap from '@/components/yandexMap.vue'

export default {
  name: 'MapContainer',
  components: {
    yandexMap
  }
}
</script>

<style lang="sass">
@import "./layouts/mixins.sass"
.v-main-map
  @include phones
    display: none
  &__heading-wrapper
    margin: 0 20px
    padding: 15px 0px
    background-image: url('~@/assets/images/divider.png')
    background-position: 0% 50%
    background-repeat: no-repeat
    transform: matrix(-1, 0, 0, 1, 0, 0)
    display: flex
    flex-direction: row-reverse
    justify-content: center
    background-size: contain
    @media screen and(max-width: 1200px)
      background-image: url('~@/assets/images/divider3.png')
    @media screen and(max-width: 1000px)
      background-position: 25% 50%
    @include phones
      display: none
      padding: 0
  &__heading
    margin: 30px 0px
    background-position: 0% 50%
    background-repeat: no-repeat
    color: white
    text-align: center
    font-size: calc(14px + (24 - 14) * ((100vw - 320px) / (1920 - 320)))
    text-transform: uppercase
    letter-spacing: .07em
    font-weight: 700
    transform: matrix(-1, 0, 0, 1, 0, 0)

    @include phones
      font-size: 16px
    &-icon
      margin-right: 15px
      align-self: center
      transform: matrix(-1, 0, 0, 1, 0, 0)
      @include phones
        padding-right: 1%
  &__container
    display: flex
    justify-content: center
    align-items: center
    margin: 0 200px 0 200px
    @include laptop
      margin: 20px 20px 0 20px
    &-content
      border: 5px solid $gray-2
</style>
