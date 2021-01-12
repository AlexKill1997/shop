<template lang="pug">
  .v-popular-items
    .v-popular-items__heading-wrapper
      h2.v-popular-items__heading Популярные товары
      img.v-main-map__heading-icon(src="~@/assets/images/icons/popular.svg")

    .v-popular-items__list
      vItem(
          v-for="(n,index) of popularItems"
          :key="n.id"
          :item="n"
          v-if="compVersion ? index < 5 : index < 6"
        )


</template>

<script>
import vItem from '@/components/Item.vue'
import Vue from 'vue'

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import cartControls from './mixins/cartControls'
export default {
  name: 'PopularItems',
  props: {
    popularItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
      return {
        compVersion: true,
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 30,
          infinite: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }

        }
      }
    },
    mounted() {
      window.addEventListener('resize', () => {
        if(window.innerWidth < 1950){
          this.compVersion = true

        }
        else this.compVersion = false
      })
  },
  components: {
    vItem,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  mixins: [cartControls]
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'

.v-popular-items
  @include phones
    display: none
  &__heading
    padding: 0
    transform: matrix(-1, 0, 0, 1, 0, 0)
    font-weight: 700
    font-size: calc(14px + (24 - 14) * ((100vw - 320px) / (1920 - 320)))
    letter-spacing: .07em
    text-transform: uppercase
    text-align: center
    color: white
    &-icon
      margin-right: 15px
      align-self: center
      transform: matrix(-1, 0, 0, 1, 0, 0)

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
  &__list
    margin-bottom: 30px
    display: flex
    flex-wrap: wrap
    justify-content: center


  &__list-item
    background-color: white
    border: 2px solid #bab4b4
    box-sizing: border-box
    position: relative
    max-width: 300px

  &__favorite-mark
    position: absolute
    right: 0
    margin: 8px
    cursor: pointer
    z-index: 1

  &__image
    display: flex
    justify-content: center
    align-items: center
    position: relative
    box-sizing: border-box
    margin: 10px
    padding: 20px
    border-bottom: 2px solid $text

  &__title
    display: flex
    justify-content: center
    align-items: center
    margin: 0 20px 25px 20px
    padding: 15px 30px
    & > *
      font-weight: 400
      text-align: center
      font-size: 18px
      letter-spacing: .07em
      color: $text
      line-height: 21px

  &__clubCost, &__cost
    margin: 0px 20px
    padding: 0px 15px
    display: flex
    justify-content: center
    align-items: center
    height: 20px
    font-weight: 700
    letter-spacing: .07em

  &__clubCost
    margin-top: 4px
    color: $red

  &__article-wrapper
    display: flex
    justify-content: center
    align-items: center
    margin: 10px 28px 0px 28px
    padding: 0px 15px
    font-weight: 400
    letter-spacing: .07em
    height: 25px
    background-color: $yellow
    .article
      display: inline-block
      margin-left: 4px
      font-weight: 700

  &__counter
    display: flex
    justify-content: center
    align-items: center
    margin-top: 15px
    .decrease, .increase
      width: 25px
      background-color: white
      border: 2px solid $yellow
      cursor: pointer
      font-weight: 700
      outline: none
      &:active
        background-color: $yellow
    .decrease
      margin-right: -2px
    .increase
      margin-left: -2px

    .quantity_value
      width: 60px
      background-color: white
      border: 2px solid $yellow
      text-align: center
      cursor: text
      font-weight: 700
      outline: none
      letter-spacing: .07em

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button
        -webkit-appearance: none
        margin: 0
    input[type=number]
      -moz-appearance: textfield

  &__shop
    display: flex
    justify-content: center
    align-items: center
    margin: 15px 75px
    padding: 6px 20px
    font-family: 'Roboto Bold'
    font-size: 16px
    letter-spacing: .07em
    text-transform: uppercase
    background-color: $yellow
    cursor: pointer
    font-weight: 700

.v-popular-wrapper
  justify-content: center
  align-items: center
  display: none
  @include phones
     display: flex

.swiper-slide
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  font-weight: bold

.swiper
  height: 300px
  width: 100%


</style>
