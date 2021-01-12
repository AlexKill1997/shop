<template lang="pug">
  li.categories-cards__item.categories-card
    NuxtLink.categories-card__inner(:to="getRoute(card._id)")
      .categories-card__img-wrap
        img.categories-card__img(:src="getImgPath(card.path, card.cSlug, card.img)" :alt="card.categoryName")
        span.categories-card__title {{ card.categoryName}}
</template>

<script>
import imgPathMixin from '@/components/mixins/imgPath';

import { mapGetters } from 'vuex'

export default {
  props: {
    parentLink: {
      type: String,
    },
    card: {
      type: Object
    },
  },
  computed: {
    ...mapGetters({
      category: 'category/GET_CURRENT_CATEGORY',
    })
  },
  methods: {
    getParentLink() {
      const { category } = this

      let str = "category";

      // if (category.parent) str += `/${category.parent.cSlug}`
      // else {
      //   if(category.subcategories.length && !category.main) str += `/${category.cSlug}`
      //   else str += ``
      // }

      return str
    }
  },
  mixins: [imgPathMixin]
}
</script>


<style lang="sass">
.categories-card__img-wrap
  width: 120%
  height: 99%
  display: flex
  align-items: flex-start
  justify-content: center
.categories-card__img
  width: 100%
  height: 100%
</style>
