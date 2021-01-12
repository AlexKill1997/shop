<template lang="pug">
  #v-brands
    .v-brands__title
      h2.v-brands__title-text Бренды с которыми мы работаем
      img.v-brands__title-icon(src="~@/assets/images/icons/brands.svg" alt="brands")
    .v-brands__container
      Swiper(ref="mySwiper" :options="swipBrand" )
        SwiperSlide( v-for="brand in brands" :key="brand.title")
          brandList( :brand="brand")
      .swiper-button-prev(slot="button-prev" @click="prev")
      .swiper-button-next(slot="button-next" @click="next")
</template>

<script>
import brandList from './brandList'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

export default {
  name: 'Brands',
  data: () => ({
    currentSlideIndex: 0,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    swipBrand: {
      slidesPerView: 9,
      slidesPerScroll: 3,
      slidesOffsetBefore: 3,
      slidesOffsetAfter: 0,
      speed: 50,
      width: 500,
      loop: true,
      autoplay: {
        delay: 100,
        disableOnInteraction: false
      },
      setWrapperSize: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
  }),
  components: {
    brandList,
    Swiper,
    SwiperSlide
    },
  props: {
    brands: {
      type: Array,
      default: () => []
    }
  },
  directives: {
    swiper: directive
  },
  methods:{
    next(){
      this.$refs.mySwiper.$swiper.slideNext()
    },
    prev(){
      this.$refs.mySwiper.$swiper.slidePrev()
    }
  }
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
#v-brands
  // background-color: $gray-1
  padding: 0
  @include tablets
    display: none

.v-brands__title
  background-image: url('~@/assets/images/divider.png')
  background-position: 0% 50%
  background-repeat: no-repeat
  display: flex
  justify-content: center
  margin: 0 20px
  background-size: contain
  @media screen and(max-width: 1200px)
    background-image: url('~@/assets/images/divider3.png')
  @media screen and(max-width: 1000px)
    background-position: 25% 50%
  &-text
    padding: 16px 0px
    font-weight: 700
    font-size: calc(14px + (24 - 14) * ((100vw - 320px) / (1920 - 320)))
    letter-spacing: .07em
    text-transform: uppercase
    text-align: center
    color: white
  &-icon
    margin-left: 15px
    align-self: center

.v-brands__container
  margin: 30px 25px 0 25px
  display: flex
  flex-wrap: wrap
  justify-content: center
  padding-bottom: 14px
  position: relative
.swiper-button-prev, .swiper-button-next
  color: $red !important
  top: 82px !important
.swiper-slide
  width: 170px !important

#v-brands > div.v-brands__container > div.swiper-container.swiper-container-initialized.swiper-container-horizontal
  width: 97% !important
  @media screen and(max-width: 3000px)
    width: 96% !important
  @media screen and(max-width: 2500px)
    width: 95% !important
  @media screen and(max-width: 1920px)
    width: 94% !important

</style>
