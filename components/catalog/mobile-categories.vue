<template lang="pug">
  .v-catalog__popup-filter(
    v-if="subcategories"
  )
    .v-catalog__popup__filters
      img.v-popup-login__closeIcon(
        :src="require('@/assets/images/icons/close_mark.svg')"
        title="Закрыть окно"
        alt="Закрыть"
        @click="$emit('close', !subcategories); $root.$emit('scroll:block')")
    template(v-if="CATEGORY.subcategories && CATEGORY.subcategories.length > 0")
      ul.categories__list(v-if="CATEGORY.subcategories && CATEGORY.subcategories.length > 0")
        .categories__list__def Подкатегории
          .categories__list__def__icon-divider
            img(src="@/assets/images/divider.png")
        li.categories__list-item(v-for="sub in CATEGORY.subcategories" :key="sub.cSlug")
          nuxt-link.categories__list-link(:to="getRoute(sub._id)")
            span.categories__item-title(:class="{ 'categories__item-title--active': CATEGORY.cSlug === sub.cSlug }") {{sub.categoryName}}
            .categories__counter
              .counter {{ sub.products || "..." }}

    template(v-else-if="CATEGORY.neighbors && CATEGORY.neighbors.length > 0")
      ul.categories__list(v-if="CATEGORY.neighbors && CATEGORY.neighbors.length > 0")
        .categories__list__def Подкатегории
          .categories__list__def__icon-divider
            img(src="@/assets/images/divider.png")
        li.categories__list-item(v-for="sub in CATEGORY.neighbors" :key="sub.cSlug")
          nuxt-link.categories__list-link(:to="getRoute(sub._id)")
            span.categories__item-title(:class="{ 'categories__item-title--active': CATEGORY.cSlug === sub.cSlug }") {{sub.categoryName}}
            .categories__counter
              .counter {{ sub.products || "..." }}
</template>

<script>
import categoriesMixin from '@/components/mixins/catalog/categories'

export default {
  props: {
    subcategories: {
      type: Boolean
    }
  },
  mixins: [categoriesMixin]
}
</script>