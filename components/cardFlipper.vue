<template lang="pug">
  .card-flipper
    .card-flipper__container(:class="{'flip': item.children && item.children.length > 0}")
      .card-flipper__front
        div.card-flipper__front-title
          span {{ item.categoryName }}
        div
          //- img(:src="getImage(item.cSlug)")
          img(:src="getImgPath(item.path, item.cSlug, item.img)" :alt="item.categoryName")
      .card-flipper__back(v-if="item.children")
        ul
          li(v-for="subCat in item.children")
            NuxtLink(:to="getRoute(subCat._id)") {{subCat.categoryName}}

</template>

<script>
import imgPathMixin from '@/components/mixins/imgPath'
export default {
  name: 'CardFlipper',
  // data: () => ({
  //   images: {
  //     'vse-dlya-krovli': 'small-catalog--1.png',
  //     'drevesno-plitnye-materialy': 'small-catalog--2.png',
  //     'teplozvukoizolyaciya':'small-catalog--3.png',
  //     'gipsokartonnye-materialy':'small-catalog--4.png',
  //     'krepezh':'small-catalog--5.png',
  //     'obshhestroitelnye-materialy':'small-catalog--8.png',
  //     'metalloprokat':'small-catalog--9.png',
  //     'otdelochnye-materialy':'small-catalog--7.png',
  //     'stroitelnye-instrumenty': 'small-catalog--6.png'
  //   }
  // }),
  // methods: {
  //   getImage(name) {
  //     return this.images[name] ? require(`../assets/images/small-catalog/${this.images[name]}`) : ""
  //   }
  // },
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  mixins: [imgPathMixin]
}
</script>

<style lang="sass">
.card-flipper
  perspective: 1000px

  &:hover &__container.flip
    transform: rotateY(-180deg)
    transition-delay: .15s
  &:hover &__container &__back
    z-index: 1 !important
    transition: z-index 1.5s

  &__container
    position: relative
    transform-style: preserve-3d
    transition: .75s

  &__back, .v-small-catalog__list &__front,
  .v__catalog__tablets &__front
    display: flex
    align-items: center
    flex-direction: column
    width: 260px
    height: 270px
    flex: 1 1 auto
    margin: 16px
    background-color: white
    border: 2px solid #bab4b4
    cursor: pointer
    // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)

  &__front
    opacity: 1
    backface-visibility: hidden
    // padding: 22px 10px 10px
    padding: 13px
    overflow: hidden
    & > div
      object-fit: cover
      margin-bottom: 10px
    & > div > img
      width: 190px
      height: auto
    &-title
      color: white

      font-size: 14px !important
      font-weight: bold
      font-stretch: normal
      line-height: 1.5
      text-align: center
      background: $red
      // border-top: 2px solid #bab4b4
      // border-bottom: 2px solid #bab4b4
      box-sizing: border-box
      width: 112%
      height: 47px
      display: flex
      justify-content: center
      align-items: center

  &__back
    position: absolute
    z-index: -1 !important
    top: -15px
    left: 0
    overflow: auto
    display: flex
    align-items: flex-start
    height: 100%
    padding: 0px 13px
    transform: rotateY(-180deg) translateZ(1px)
    transition: z-index 1.2s
    backface-visibility: hidden
    &::-webkit-scrollbar
      width: 6px
    &::-webkit-scrollbar-thumb
      background-color: #d8d8d8
      border-radius: 10px
    &::-webkit-scrollbar-track
      border-width: 0
    ul
      list-style: none
      // width: 92%
      width: 100%
      // margin: 20px 0px 20px 20px
      padding: 0 1px 0 0
      margin: 10px 0
      li
        display: flex
        background: #f6f6f6
        &:not(:last-child)
          margin-bottom: 5px
        a
          color: #202020
          font-size: 15px
          // font-weight: 400
          font-weight: bold
          font-style: normal
          line-height: 1.53
          text-align: left
          font-stretch: normal
          letter-spacing: .1px
          text-decoration: none
          transition: color .1s ease
          padding: 5px
          &:hover
            color: $red
</style>
