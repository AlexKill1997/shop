<template lang="pug">
  .v-carousel
    Agile(
      :autoplay="true",
      :autoplaySpeed="4000",
      :infinite="true",
      :navButtons="false",
      :speed="500",
      timing="ease")
      nuxt-link.slide(v-for="item in data" :key="item.id" :to="`/catalog/region/category/${item.link}`")
        img.slide__image(:src="require('../assets/images/carousel-images/' + item.img)" :alt="item.alt" )
        span.slide__slogan(:to="`/catalog/region/category/${item.link}`") {{ item.slogan }}
        .theme-block
          img.theme-block__image(:src="require('../assets/images/logo-gray.png')")
          span.theme-block__title {{ item.theme }}
</template>

<script>
import { VueAgile } from 'vue-agile'

export default {
  name: 'Carousel',
  components: {
    Agile: VueAgile
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
.v-carousel
  height: 100%
  width: 100%
  position: absolute
  @include largelaptop
    max-width: unset
    width: 100%
.slide
  position: relative
  height: 100%
.agile
  position: relative
  height: 100%
.agile__actions
  position: absolute
  left: 0
  justify-content: center
  right: 0
  bottom: calc(10% - 20px)
  ul
    li
      @media screen and(max-width: 1300px)
        width: 30px
        margin: 0px 12px
.agile__track,
.agile__list
  height: 100%
.agile__dot
  width: 40px
  margin: 0px 18px
  button
    width: 40px
    border: 6px solid white
    background-color: white
.agile__dot--current
  button
    border: 6px solid black
    background-color: black
.slide__image
  position: relative
  object-fit: cover
  object-position: center
  width: 100%
  height: 100%
  min-height: 500px
  @media screen and (max-width: 1600px)
    max-height: 500px


.slide__slogan
  display: flex
  justify-content: center
  align-items: center
  padding: 15px 0
  position: absolute
  top: 20px
  left: 0
  right: 0
  width: 100%
  font-weight: 700
  font-size: calc(16px + (25 - 16) * ((100vw - 320px) / (1920 - 320)))
  text-transform: uppercase
  text-align: center
  background-color: $red
  color: white
  @include phones
    top: 0px

.theme-block
  display: flex
  align-items: center
  position: absolute
  background-color: rgba(239, 239, 239, .7)
  z-index: 3
  bottom: 20%
  left: 0
  right: 0
  &__image
    margin: 10px 14px 10px 26px
  &__title
    font-weight: 700
    font-size: calc(18px + (75 - 18) * ((100vw - 320px) / (1920 - 320)))
    text-transform: uppercase
    color: $text
    @media screen and(max-width: 1500px)
      font-size: 35px
</style>
