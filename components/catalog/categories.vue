<template lang="pug">
  .v-catalog__categories
    .categories__header(@click="$emit('toggle', !parentShow)")
      h4.categories__heading Подкатегории:


      img.categories__icon(:class="{'turnHalf':parentShow}" :src="require('@/assets/images/items/arrow-circle1.svg')" title="Развернуть")
    template(v-if="CATEGORY.subcategories && CATEGORY.subcategories.length > 0")
      transition(name="fade")
        ul.categories__list(v-if="parentShow")
          li.categories__list-item(v-for="sub in CATEGORY.subcategories" :key="sub.cSlug")
            nuxt-link.categories__list-link(:to="getRoute(sub._id)")
              span.categories__item-title(:class="{ 'categories__item-title--active': CATEGORY.cSlug === sub.cSlug }") {{sub.categoryName}}
              .categories__counter
                .counter {{ sub.products || "..." }}
                //- .counter(v-if="sub.products") {{ sub.products }}

    template(v-else-if="CATEGORY.neighbors && CATEGORY.neighbors.length > 0")
      transition(name="fade")
        ul.categories__list(v-if="parentShow")
          li.categories__list-item(v-for="sub in CATEGORY.neighbors" :key="sub.cSlug")
            nuxt-link.categories__list-link(:to="getRoute(sub._id)")
              span.categories__item-title(:class="{ 'categories__item-title--active': CATEGORY.cSlug === sub.cSlug }") {{sub.categoryName}}
              .categories__counter
                .counter {{ sub.products || "..." }}
</template>

<script>
import { mapGetters } from 'vuex'

import categoriesMixin from '@/components/mixins/catalog/categories'

export default {
  props: {
    parentShow: {
      type: Boolean,
    }
  },
  mixins: [categoriesMixin],
}
</script>