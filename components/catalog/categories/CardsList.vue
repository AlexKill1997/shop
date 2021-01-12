<template lang="pug">
  .categories-cards
    ul.categories-cards__list
      .categories-cards__list__container(ref="cards")
        Card.cards__of__cards(v-for="card in cards" :card="card" :key="card.cSlug" :parentLink="parentLink")
      Swiper.swiper-awesome(v-if="cards.length > 2" ref="mySwiper" :options="swiperOptions" data-swiper-autoplay="20")
        SwiperSlide(v-for="card in cards" :key="card.cSlug")
          Card(:card="card" :key="card.cSlug" :parentLink="parentLink")
      .categories-cards__list__container.alternative(v-if="cards.length < 3")
        Card.cards__of__cards(v-for="card in cards" :card="card" :key="card.cSlug" :parentLink="parentLink")
        //- .swiper-pagination(slot="pagination")
</template>

<script>
import Card from "./Card"
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

export default {
  props: {
    noscroll: {
      type: Boolean
    }
  },
  data() {
      return {
        swiperOptions: {
          slidesPerView: 2,
          slidesPerScroll: 2,
          spaceBetween: 0,
          centeredSlides: true,
          loop: true,
          speed: 100,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          setWrapperSize: true
        }
      }
    },
    mounted() {
      if (this.noscroll) return
      
      

  },

  props: {
    cards: {
      type: Array
    },
    parentLink: {
      type: String,
    },
  },
  components: {
    Card,
    Swiper,
    SwiperSlide

  },
  directives: {
    swiper: directive
  }
}
</script>

<style lang="sass">
@import '@/layouts/mixins.sass'
@import 'swiper/swiper-bundle.css'
.categories-cards
  margin-bottom: 16px
  @include phones
    margin-bottom: 16px
  &__list
    display: flex
    flex-wrap: wrap
    margin: 0
    padding: 0
    list-style: none
    justify-content: center
    @include phones
      padding: 0 3px
      margin-top: 15px
      margin-bottom: 15px
    .categories-cards__list__container
      margin-bottom: 16px
      width: fit-content
      display: grid
      grid-template-columns: repeat(6, minmax(150px,150px))
      flex-wrap: wrap
      justify-content: center
      width: 100%
      grid-gap: 16px
      @media screen and(max-width: 3000px)
        grid-template-columns: repeat(8, minmax(200px, 400px))
      @media screen and(max-width: 2813px)
        grid-template-columns: repeat(7, minmax(150px, 400px))
      @media screen and(max-width: 2512px)
        grid-template-columns: repeat(7, minmax(150px, 300px))
      @media screen and(max-width: 1806px)
        grid-template-columns: repeat(6, minmax(150px, 300px))
      @media screen and(max-width: 1600px)
        grid-template-columns: repeat(5, minmax(150px, 300px))
      @media screen and(max-width: 1410px)
        grid-template-columns: repeat(4, minmax(150px, 300px))
      @media screen and(max-width: 1291px)
        grid-template-columns: repeat(4, minmax(150px, 250px))
      @media screen and(max-width: 1073px)
        grid-template-columns: repeat(3, minmax(150px, 250px))
      @include tablets
        display: none
      // width: 1414px
      // @media screen and(max-width: 1800px)
      //   width: 1010px
      // @media screen and(max-width: 1410px)
      //   width: 760px
      // @media screen and(max-width: 1126px)
      //   width: 456px
      // @media screen and(max-width: 990px)
      //   width: 760px
      @include phones
        display: none
  &__item

    flex-shrink: 0
    padding-top: 0
    @include phones
      padding: 0px


.categories-card
  &__inner
    position: relative
    display: block
    width: 100%
    height: 100%
    background-color: #fff
    border: 2px solid #bab4b4
    width: 200px
    height: 200px
    display: flex
    justify-content: center
    align-items: center
    @media screen and(max-width: 3000px)
      width: 300px
      height: 300px
    @media screen and(max-width: 2512px)
      height: 250px
    @media screen and(max-width: 1920px)
      height: 200px
    // @media screen and(max-width: 1410px)
    //   width: 150px
    //   height: 150px
    @include tablets
      width: 180px
      height: 180px
      min-height: unset
    @include phones
      width: 172px
      height: 172px
      box-shadow: none
    @media screen and(max-width: 400px)
      width: 165px
      height: 165px
    @media screen and(max-width: 366px)
      width: 146px
      height: 146px
  &__title
    height: 40px
    background-color: $red
    position: absolute
    width: 100%
    bottom: 20px
    display: flex
    align-items: center
    justify-content: center
    text-align: center
    color: $text
    font-size: 14px
    color: white
    @include phones
      font-size: 12px
      bottom: 5px
      height: 40px
  &__img-path
    width: 100%
    height: 100%

  &__img
    width: 100%
    height: 100%
    object-fit: cover
  &__img-wrap
    width: 100%
    height: 100%
    display: flex
    align-items: flex-start
    justify-content: center
    height: 99%
    // margin-bottom: 45px
    img
      width: 100%
      height: 100%

.swiper-awesome
  display: none
  @include tablets
    display: flex
    padding: 0 3px

.cards__of__cards
  display: flex
.alternative
  display: none !important
  @include tablets
    margin-bottom: 0 !important
    display: flex !important
  .categories-card
    padding: 5px
</style>
