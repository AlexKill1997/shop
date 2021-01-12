<template lang="pug">
  #v-small-catalog.v-small-catalog
    .v-small-catalog__heading-wrapper

      h2.v-small-catalog__heading Каталог строительных материалов
      img.v-small-catalog__heading-icon(src="~@/assets/images/icons/catalog.svg")
    .v-small-catalog__handler
      slot.v-small-catalog__aside(name="list")
      .v-small-catalog__list
        .v-small-catalog__list__container
          vCardFlipper(
            v-for='cart in smallCatalogListItems' :key="cart.title"
            :item="cart"
          )
        Swiper.swiper_for_smallCat(ref="mySwiper" :options="swipSmallCatalog" )
          SwiperSlide(v-for='cart in smallCatalogListItems' :key="cart.title")
            vCardFlipper(
              :item="cart"
            )
          //- .swiper-pagination(slot="pagination")
          //- .swiper-button-prev(slot="button-prev")
          //- .swiper-button-next(slot="button-next")

</template>

<script>
import { mapGetters } from 'vuex'
import vCardFlipper from './cardFlipper'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

export default {
  data: () => ({
    currentSlideIndex: 0,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    swipSmallCatalog: {
      slidesPerView: 2,
      slidesPerScroll: 2,
      spaceBetween: 40,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      centeredSlides: true,
      loop: true,
      speed: 100,
      autoplay: {
        delay: 2500,
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
  name: 'SmallCatalog',
  components: {
    vCardFlipper,
    Swiper,
    SwiperSlide
  },
  props: {
    smallCatalogListItems: {
      type: Array,
      default: () => []
    }
  },
  head() {
    return this.$seo({
      title: 'Каталог строительных и отделочных материалов ТД ЦСК в Москве и МО с ценами, размерами, фото и описанием',
      keywords: 'стройматериалы цены, каталог стройматериалов, магазин стройматериалов в москве, строительные материалы каталог, строительные материалы каталог товаров, отделочные материалы москва, строительные и отделочные материалы, сайт, стройматериалы, каталог, купить, цена, москва, мо, недорого',
      description: 'В каталоге интернет магазина ТД ЦСК в Москве и МО представлен широкий перечень строительных и отделочных материалов с ценами, размерами, фото и описанием по ценам и с доставкой.'
    })
  },
  methods: {
    prevSlide(){

      if(this.currentSlideIndex > 0) {
          this.currentSlideIndex--
      }
    }
  },
  directives: {
    swiper: directive
    // nextSlide(){

    //   if(this.currentSlideIndex < this.smallCatalogListItems.length-1){
    //   this.currentSlideIndex++
    //   }
    // }
  }
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
@import 'swiper/swiper-bundle.css'
#v-small-catalog
  background-color: $gray-1

.v-small-catalog
  $block: &

  &__handler
    display: flex
    justify-content: center
  &__heading-wrapper
    padding: 15px 0px
    background-position: 0% 50%
    background-repeat: no-repeat
    margin: 0 20px
    // transform: matrix(-1, 0, 0, 1, 0, 0)
    display: flex
    justify-content: center
    background-image: url('~@/assets/images/divider.png')
    background-size: contain
    @media screen and(max-width: 1000px)
      background-image: url('~@/assets/images/divider3.png')
      background-position: 25% 50%
    @include phones
      display: none
    img
      @media screen and(max-width: 1100px)
        height: 25px
  &__heading
    padding: 0px

    font-weight: 700
    font-size: calc(14px + (24 - 14) * ((100vw - 320px) / (1920 - 320)))
    text-transform: uppercase
    letter-spacing: .07em
    text-align: center
    color: white
    @include phones
      font-size: 16px

    &-icon
      margin-left: 15px
      align-self: center
      @include phones
        padding-right: 1%
  &__list
    display: flex
    flex-wrap: wrap
    justify-content: center
    padding: 9px 0 9px 0
    @media screen and(max-width: 1168px)
      width: 100%
      padding: 5px
    @include phones
      display: none
    .swiper_for_smallCat
      display: none
      @media screen and(max-width: 1168px)
        display: block
    &__container
      width: 1460px
      display: flex
      flex-wrap: wrap
      @media screen and(max-width: 1460px)
        width: 1168px
      @media screen and(max-width: 1168px)
        display: none
  &--visible
    #{$block}__list
      @include phones
        display: flex


.catalog__wrapper
  justify-content: center
  align-items: center
  display: none
  @include phones
     display: flex
.v__catalog__tablets
  justify-content: center
  max-width: 292px
  overflow: hidden
  align-items: center


.v__catalog__tablets__list
  display: flex
  transition: all ease 1s


</style>
