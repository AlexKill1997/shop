<template lang="pug">
  #v-first-screen
    .v-first-screen
      .v-first-screen__preloader-slider-wrapper
        .v-first-screen__preloader-slider-wrapper-inner
          loader
          client-only
            Carousel(
              :data="sliderItems")
      SpecialOffers(
        :specialOffers="specialOffers")
    vAc
    .special__offer
      p -6% на OSB при покупке кровли!
      .special__offer__type
        p Акция
    .special__offer.other1
      p -10% на СТРОИТЕЛЬНЫЕ ИНСТРУМЕНТЫ!
      .special__offer__type
        p Акция
    .special__offer.other2
      p -10% на МЕТАЛЛОПРОКАТ!
      .special__offer__type
        p Акция
    .special__offer.other3
      p -10% на ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ!
      .special__offer__type
        p Акция
</template>

<script>
import Carousel from './Carousel.vue'
import SpecialOffers from './SpecialOffers.vue'
import loader from '@/components/Loader/Loader'
import vAc from './ac/ac'

export default {
  name: 'FirstScreen',
  components: {
    Carousel,
    SpecialOffers,
    loader,
    vAc
  },
  data() {
    return {
      sliderItems: [
        {
          id: 1,
          img: '1.jpg',
          slogan: 'Прекрасный внешний вид и защита вашего дома',
          theme: 'Кровля',
          link: 'vse-dlya-krovli',
          alt: 'Все для кровли'
        },
        {
          id: 2,
          img: '2.jpg',
          slogan: 'Монтаж перегородок и перекрытий: быстро, легко и надежно',
          theme: 'Гипсокартон',
          link: 'gipsokartonnye-materialy',
          alt: 'Гипсокартон'
        },
        {
          id: 3,
          img: '3.jpg',
          slogan: 'Обшивка стен, настил полов, строительство помещений',
          theme: 'ДСП, ОСБ, ГСП, МДФ',
          link: 'drevesno-plitnye-materialy',
          alt: 'ДСП, ОСБ, ГСП, МДФ'

        },
        {
          id: 4,
          img: '4.jpg',
          slogan: 'Асбестоцементные изделия, гидроизоляция, кирпич',
          theme: 'Стройматериалы',
          link: 'obshhestroitelnye-materialy',
          alt: 'Стройматериалы'
        },
         {
          id: 5,
          img: '5.jpg',
          slogan: 'Арматура, швеллер, лист, уголок, балка двутавровая и другое',
          theme: 'Металлопрокат',
          link: 'metalloprokat',
          alt: 'Металлопрокат'
        },
        //  {
        //   id: 6,
        //   img: '6.jpg',
        //   slogan: 'Обустройство дачной территории и участка около дома',
        //   theme: 'Дача и сад'
        // },
        {
          id: 7,
          img: '7.jpg',
          slogan: 'Внутренние и внешние материалы для отделочных работ',
          theme: 'Краски и лаки',
          link: 'otdelochnye-materialy',
          alt: 'отделочные материалы'
        },
        {
        id: 8,
        img: '8.jpg',
        slogan: 'Множество разновидностей утеплителей для дома ',
        theme: 'Теплоизоляция',
        link: 'teplozvukoizolyaciya',
        alt: 'Теплоизоляция'
        },
      ],
      specialOffers: [
        {
          id: 1,
          type: 'Скидка',
          description: 'Акция Knauf: «Открывай Россию вместе с KNAUF»',
          image: 'offer-1.jpg',
          alt: 'Акция Knauf'
        },
        {
          id: 2,
          type: 'Акция',
          description: '-6% на OSB при покупке кровли!',
          image: 'offer-2.jpg',
          alt: 'Акция OSB'
        },
        {
          id: 3,
          type: 'Акция',
          description: 'На теплоизоляционные плиты',
          image: 'offer-3.jpg',
          alt: 'Акция на теплоизоляционные плиты'
        },
        {
          id: 4,
          type: 'Акция',
          description: 'На черепицу Шинглас',
          image: 'offer-4.jpg',
          alt: 'Акция на черепицу Шинглас'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
.v-first-screen
  padding: 25px 30px 25px 30px
  background-color: $gray-2
  display: flex
  justify-content: center
  @media screen and(max-width: 1600px)
    display: grid
    grid-template-columns: 50% 50% 
  @media screen and(max-width: 1024px)
    display: none

  &__preloader-slider-wrapper
    width: 100%
    max-width: 50%
    @media screen and (max-width: 1600px)
      max-width: 100%
    &-inner
      width: 100%
      padding-bottom: 68.8%
      min-height: 500px
      position: relative
      @media screen and (max-width: 1600px)
        padding-bottom: 34.4%


.special__offer
  background-image: url(../assets/images/special-offers/offer-5.jpg)
  background-position: center center
  background-repeat: no-repeat
  background-size: cover
  height: 91px
  width: 100%
  align-items: flex-end
  overflow: hidden
  position: relative
  display: none
  @include phones
    display: flex
    margin-top: 5px
.other1
  background-image: url(../assets/images/special-offers/offer-6.jpg) !important

.other2
  background-image: url(../assets/images/special-offers/offer-7.jpg) !important
.other3
  background-image: url(../assets/images/special-offers/offer-8.jpg) !important

.special__offer p
  color: white
  font-weight: bold
  font-size: 16px
  padding: 0 0 5% 1%

.special__offer__type
  background-color: yellow
  position: absolute
  width: 100px
  height: 20px
  display: flex
  align-items: center
  justify-content: center
  transform: rotate(45deg)
  right: -29px
  bottom: 60px
  p
    color: black
    font-size: 12px



</style>
