<template lang="pug">
  div
    //- swiper( ref="mySwiper" :options="swiperOptions"
    //- )
    //- h1 |bhcvudcui
</template>

<script>
import vItem from '@/components/Item'
import Swiper from 'vue-swiper'
export default {
  name: 'Swiper',
  props: {
    popularItems: {
      type: Array,
      default: () => []
    }
  },
  methods: {
  },
  components: {
    Swiper
  }
}
</script>
