<template lang="pug">
  .v-product__pagination
    transition-group(name="fade" class="row")
      .page(
        @click="paginationHandler('back')"
        v-if="currentPage != 1"
        :key="'back'"
      ) {{ "<" }}
      .page(
        @click="paginationHandler(1)"
        v-if="currentPage != 1"
        :key="1"
      ) {{ 1 }}
      .dotted-left(v-if="currentPage - 2 > 1"
        :key="'separator-1'") ...
      .page(
        v-for="page in pagesCount"
        @click="paginationHandler(page)"
        :key="page"
        v-if="(page != 1) && (page == currentPage - 1)"
      ) {{ page }}
      .page(
        v-for="page in pagesCount"
        @click="paginationHandler(page)"
        :key="page"
        :class="{'page__selected': page === currentPage}"
        v-if="(page == currentPage)"
      ) {{ page }}
      .page(
        v-for="page in pagesCount"
        @click="paginationHandler(page)"
        :key="page"
        v-if="(page != pagesCount.length) && (page == currentPage + 1)"
      ) {{ page }}
      .dotted-right(v-if="currentPage + 2 < pagesCount.length"
        :key="'separator-2'") ...
      .page(
        @click="paginationHandler(pagesCount.length)"
        v-if="currentPage != pagesCount.length"
        :key="pagesCount.length"
      ) {{ pagesCount.length }}
      .page(
        @click="paginationHandler('forward')"
        v-if="currentPage != pagesCount.length"
        :key="'forward'"
      ) {{ ">" }}
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    pagesCount: {
      type: [Array, Object],
      required: true
    },
  },
  computed: {
    ...mapGetters({
      pageNumber: 'product/GET_PAGE_NUMBER'
    }),
    currentPage() {
      return this.pageNumber
    },
  },
  methods: {
    paginationHandler(page) {
      this.$emit("paginate", page)
    },
  }
}
</script>

<style lang="sass">
@import '@/layouts/mixins.sass'
.v-product__pagination
  display: flex
  flex-wrap: wrap
  justify-content: center
  margin-bottom: 19px

  @include phones
    display: none

  .row
    display: flex
    flex-direction: row
    .page
      cursor: pointer
  .page
    padding: 10px 15px
    margin-right: 20px
    border: 2px solid #BAB4B4
    &__selected
      background-color: $red
      color: #fff
    // &:hover
    //   border: 1px solid #BAB4B4
  .dotted-left, .dotted-right
    position: relative
    right: 10px
    top: 13px
</style>