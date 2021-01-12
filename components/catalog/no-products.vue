<template lang="pug">
  #v-catalog
    //- Подкатегории

    .v-catalog__popup-filter(v-if="subcategories && CATEGORY[isBrand ? 'subcategories' : 'neighbors'].length > 0")
      .v-catalog__popup__filters
        img.v-popup-login__closeIcon(
          :src="require('@/assets/images/icons/close_mark.svg')"
          title="Закрыть окно"
          alt="Закрыть"
          @click="subcategories = !subcategories; $root.$emit('scroll:block')")
        ul.categories__list(v-if="CATEGORY.neighbors && CATEGORY[isBrand ? 'subcategories' : 'neighbors'].length > 0")
          .categories__list__def Подкатегории
            .categories__list__def__icon-divider
              img(src="@/assets/images/divider.png")
          li.categories__list-item(v-for="sub in CATEGORY[isBrand ? 'subcategories' : 'neighbors']" :key="sub.cSlug")
            nuxt-link.categories__list-link(:to="getRoute(sub._id)")
              span.categories__item-title(:class="{ 'categories__item-title--active': CATEGORY.cSlug === sub.cSlug }") {{sub.categoryName}}
              .categories__counter
                .counter(v-if="sub.products") {{ sub.products }}

    vBreadcrumbs(:breadcrumbs="breadcrumbs")
    template(v-if="CATEGORY.parentName")
      h1.v-catalog__heading {{ CATEGORY.parentName }}
    .v-catalog
      .v-catalog__aside
        //- Категории
        Categories(:parentShow="isTurn1" @toggle="isTurn1 = $event")

      .v-catalog__content
        img(:src="require('@/assets/images/items/banner.png')")
        template(v-if="CATEGORY.subcategories && CATEGORY.subcategories.length")
          CategoriesCards(:cards="CATEGORY.subcategories" :noscroll="true")
        template(v-if="CATEGORY.description")
          SeoProduct(:img="getImgPath(CATEGORY.path, CATEGORY.cSlug, CATEGORY.img)" :seocontent="CATEGORY.description")
</template>

<script>
import { mapGetters } from 'vuex';

import catalogMixin from '@/components/catalog/mixin'
import productsCountPreloadMixin from '../mixins/catalog/productsCountPreloadMixin';

export default {
  
  data: () => ({
    banners: [
      {
        id: 1,
        image: 'banner.png'
      },
      {
         id: 2,
        image: 'banner1.png'
      },
      {
         id: 3,
        image: 'banner2.png'
      },
      {
         id: 4,
        image: 'banner3.png'
      }
    ]
  }),
  mixins: [catalogMixin, productsCountPreloadMixin],
  computed: {
     getRndInteger() {
    return Math.floor(Math.random() * (4 - 1) ) + 1
  },
    ...mapGetters({
      stateCategory: 'GET_CURRENT_CATEGORY'
    }),
    CATEGORY() {
      return this.stateCategory(this.$route.params.category)
    },
    breadcrumbs() {
      return [
        { text: 'Главная', link: '/' },
        {
          text: 'Каталог',
          link: '/catalog'
        },
        {
          text: this.CATEGORY.categoryName,
        }
      ]
    }
  },
}
</script>
