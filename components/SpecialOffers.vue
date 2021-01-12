<template lang="pug">
  #v-special-offers.special-offers
    .special-offers__wrapper
      .special-offers__item(v-for="item in specialOffers")
        .special-offers__type {{item.type}}
        img.special-offers__image(:src="require('../assets/images/special-offers/' + item.image)" :alt="item.alt")
        .special-offers__description {{ item.description }}
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'SpecialOffers',
  props: {
    specialOffers: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
.special-offers
  // @include largelaptop
  width: 46%
  margin-left: 15px
  @media screen and (max-width: 1880px)
    width: 40%
  @media screen and (max-width: 1050px)
    width: 100%
    margin-left: 0
  @include largelaptop
      width: 100% !important
      margin-left: unset !important
  @include phones
    display: none
  &__wrapper
    display: grid
    grid-template-columns: 50% 50%
    // grid-template-rows: calc(50% - 30px) 50%
    z-index: 9
    position: relative
    grid-gap: 30px
    grid-template-areas: 'first second' 'third forth'
    align-items: stretch
    width: 100%
    height: 100%
    justify-content: space-between
    @include max
      flex-wrap: wrap
      padding-left: 20px
    @include largelaptop
      grid-gap: 20px
      padding-left: 20px
      width: 100%
      flex-direction: row
      flex-wrap: wrap
    @media screen and(max-width: 1600px)
      height: 100%
      grid-template-columns: 49% 49%
      grid-gap: 2%

  &__item
    width: 100%
    height: 100%
    margin: 0
    overflow: hidden
    position: relative
    // &::after
    //   position: absolute
    //   content: 'Скидка'
    //   background-color: yellow
    //   top: 20px
    //   left: -40px
    //   z-index: 10
    //   padding: 5px 30px
    //   width: 100px

    //   transform: rotate(-45deg)
    //   text-align: center
    &:first-child
      grid-area: first
    &:nth-child(2)
      grid-area: second
    &:nth-child(3)
      grid-area: third
    &:last-child
      grid-area: forth
  &__image
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center
    z-index: 2
    cursor: pointer
    position: relative

  &__type
    display: flex
    align-items: center
    justify-content: center
    position: absolute
    height: 30px
    width: 125px
    background-color: $yellow
    transform: rotate(-45deg)
    top: 17px
    left: -30px
    font-weight: 700
    letter-spacing: .07em
    font-size: 16px
    z-index: 26
  &__description
    display: flex
    justify-content: center
    align-items: center
    position: absolute
    bottom: 20px
    width: 100%
    background-color: $red
    font-weight: 700
    padding: 12px 0px
    letter-spacing: .07em
    text-align: center
    color: white
    font-size: 13px
    z-index: 5
    @media screen and(max-width: 1400px)
      font-size: 12px
</style>
