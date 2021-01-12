<template lang="pug">
  #v-about
    .v-about__first-screen
      img.v-about__first-screen-img(:src="require('../assets/images/about/header-bg.jpg')")
      h1.v-about__first-screen-heading
        | Крупнейший и надежный поставщик строительных и отделочных материалов
      img.v-about__first-screen-logo(:src="require('../assets/images/about/logo_298x380.png')")

    .v-about__company
      img.v-about__company-img(:src="require('../assets/images/about/body-bg-1.jpg')")
      .v-about__wrapper-left
        h2.v-about__company-heading
          | О компании
        img.v-about__logo-mini(:src="require('../assets/images/about/logo_mini.png')")
      .v-about__advantages-list-wrapper(
        data-aos="fade-right"
        data-aos-once="true"
        data-aos-duration="650"
        data-aos-easing="ease-out"
      )
        ul.v-about__company-advantages-list
          li.v-about__company-advantages-list-item
            span Объём продаж за&nbsp;2019 год 7.000.000.000&nbsp;&#8381; &nbsp;
          li.v-about__company-advantages-list-item
            span Более 500 прямых контрактов с&nbsp;заводами
          li.v-about__company-advantages-list-item
            span Мы&nbsp;работаем 7&nbsp;дней в&nbsp;неделю
          li.v-about__company-advantages-list-item
            span Ассортимент более 100.000 товаров

    .v-about__logistics
      img.v-about__logistics-img(:src="require('../assets/images/about/body-bg-2.jpg')")
      .v-about__advantages-list-wrapper(
        data-aos="fade-right"
        data-aos-once="true"
        data-aos-duration="650"
        data-aos-easing="ease-out"
      )
        ul.v-about__logistics-advantages-list
          li.v-about__logistics-advantages-list-item
            span Высокая скорость загрузки
          li.v-about__logistics-advantages-list-item
            span Доставка в&nbsp;выходные дни
          li.v-about__logistics-advantages-list-item
            span Оперативные срочные доставки
          li.v-about__logistics-advantages-list-item
            span Складской комплекс площадью 20.000&nbsp;м
              sup 2
      .v-about__wrapper-right
        img.v-about__logo-mini(:src="require('../assets/images/about/logo_mini.png')")
        h2.v-about__logistics-heading
          | Логистика

    .v-about__staff
      img.v-about__staff-img(:src="require('../assets/images/about/body-bg-3.jpg')")
      .v-about__wrapper-left
        h2.v-about__staff-heading
          | Персонал
        img.v-about__logo-mini(:src="require('../assets/images/about/logo_mini.png')")
      .v-about__advantages-list-wrapper(
        data-aos="fade-left"
        data-aos-once="true"
        data-aos-duration="650"
        data-aos-easing="ease-out"
      )
        ul.v-about__staff-advantages-list
          li.v-about__staff-advantages-list-item
            span 270 сотрудников в&nbsp;штате
          li.v-about__staff-advantages-list-item
            span Современный CALL-центр
          li.v-about__staff-advantages-list-item
            span Более 500 звонков в&nbsp;сутки
          li.v-about__staff-advantages-list-item
            span Миллионы обработанных заявок

    .v-about__service
      img.v-about__service-img(:src="require('../assets/images/about/body-bg-4.jpg')")
      .v-about__advantages-list-wrapper(
        data-aos="fade-right"
        data-aos-once="true"
        data-aos-duration="650"
        data-aos-easing="ease-out"
      )
        ul.v-about__logistics-advantages-list
          li.v-about__logistics-advantages-list-item
            span Комплексная поставка на всех этапах строительства
          li.v-about__logistics-advantages-list-item
            span Персональный менеджер
          li.v-about__logistics-advantages-list-item
            span Поставка товара по выбранной матрице
          li.v-about__logistics-advantages-list-item
            span Оплата любым удобным способом
      .v-about__wrapper-right
        img.v-about__logo-mini(:src="require('../assets/images/about/logo_mini.png')")
        h2.v-about__service-heading
          | Сервиc

    vCta
</template>

<script>
import vCta from '@/components/cta.vue'

export default {
  name: 'About',
  components: {
    vCta
  }
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
.v-about
  color: white
  &__first-screen
    display: flex
    align-items: center
    justify-content: center
    height: 100vh
    flex-direction: column
    position: relative
    z-index: 1
    top: 0
    // margin-bottom: 70px
    &-img
      position: absolute
      width: 100%
      height: 100%
      z-index: -1
      object-fit: cover
      object-position: center
      @include phones
        object-position: right
    &-heading
      display: flex
      text-align: center
      color: white
      text-transform: uppercase
      margin-bottom: 40px
    &-logo
      @include phones
        min-width: 200px
        width: 200px

  &__company, &__logistics, &__staff, &__service
    display: flex
    align-items: center
    justify-content: space-between
    position: relative
    min-height: 590px
    padding: 0 112px
    // margin-bottom: 78px
    margin-bottom: 10px
    @include tablets
        min-width: 300px
        padding: 50px 10px !important
    @include laptop
      padding: 112px
      flex-direction: column
    &:last-child
      margin-bottom: 64px
    &-heading
      display: flex
      font-size: 46px
      text-transform: uppercase
      font-weight: 700
      margin-top: 0
      margin-bottom: 0
      font-size: calc(22px + (46 - 22) * ((100vw - 320px) / (1920 - 320)))
  &__logistics, &__service
    @include laptop
      flex-direction: column-reverse
  &__wrapper-left, &__wrapper-right
    display: flex
    align-items: center
    justify-content: center
    text-align: center
    background-color: $yellow-2
    height: 120px
    min-width: 620px
    @include laptop
      min-width: 438px
    @include tablets
      height: 90px
      min-width: unset
      width: 100%
  &__wrapper-left
    .v-about__company-heading,
    .v-about__staff-heading
      margin-right: 50px

  &__wrapper-right
    .v-about__logistics-heading,
    .v-about__service-heading
      margin-left: 50px

  &__company-img,
  &__logistics-img,
  &__staff-img,
  &__service-img
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: -1
    object-fit: cover
    object-position: center

  &__company-advantages-list,
  &__staff-advantages-list,
  &__logistics-advantages-list,
  &__service-advantages-list
    display: flex
    flex-direction: column
    justify-content: flex-end
    padding: 0

    &-wrapper
      display: flex
      justify-content: flex-end

    &-item
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      width: 438px
      height: 90px
      margin: 18px 0px
      padding: 0px 20px
      background-color: rgba($yellow-2, .7)
      text-align: center
      font-weight: 700
      font-size: 22px
      @include tablets
        width: 100%
      &:nth-child(2),
      &:nth-child(3)
        position: relative
        right: 220px
        @include laptop
          right: 0
  &__logistics-advantages-list,
  &__service-advantages-list
    right: 0
    left: 113px
    top: 50px
    &-item
      &:nth-child(2),
      &:nth-child(3)
        position: relative
        left: 220px
        @include laptop
          left: 0
  &__advantages-list-wrapper
    @include tablets
      width: 100%
</style>
