<template lang="pug">
  .v-brands__container-item
    template(v-if="brand.disabled")
      .v-brands__container-link(:to="`brands/${brand.slug}`")
        img.v-brands__container-img(:src="getImgPath(brand.path, brand.slug, brand.img)" :alt="getAlt()")
    template(v-else)
      nuxt-link.v-brands__container-link(:to="`brands/${brand.slug}`")
        .v-brands__container-wrap
          img.v-brands__container-img(:src="getImgPath(brand.path, brand.slug, brand.img)" :alt="getAlt()")
          span.v-brands__container-title {{ brand.name}}
</template>

<script>
import getStaticImage from './mixins/imgPath'
import getImgPath from './mixins/imgPath'

export default {
  name: 'brandList',
  props: {
    brand: {
      type: Object,
      default: {},
    },
  },
  methods: {
      getAlt() {
        return ''
      }
  },
  mixins: [getImgPath, getStaticImage]
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
.v-brands__container
  &-item
    display: flex
    justify-content: center
    align-items: center
    border: 2px solid #ADADAD
    background-color: white
    height: 179px !important
    width: 160px !important
    // @include largelaptop
    //   width: 160px
  &-link
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
  &-wrap
    width: 100%
    // height: 100%
    display: flex
    align-items: flex-start
    justify-content: center
  &-img
    width: 100%
    height: 100%
  &-title
    height: 40px
    background-color: $red
    position: absolute
    width: 92%
    bottom: 20px
    display: flex
    align-items: center
    justify-content: center
    text-align: center
    color: #000
    font-size: 14px
    color: #fff
</style>
