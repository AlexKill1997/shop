<template lang="pug">
  ul.v-breadcrumbs
    li.v-breadcrumbs__item(v-for="item in breadcrumbs")
      NuxtLink.v-breadcrumbs__link(v-if="item.link" :to="item.link")
        span
          | {{ item.text }}
      span(v-else)
        | {{ item.text | formatText }}
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    breadcrumbs: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    formatText(val) {
      if(!val) return ""
      else return val
    }
  }
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'

.v-breadcrumbs
  padding: 9px 45px
  background-color: $gray-1
  grid-area: breadcrumbs
  margin-bottom: 19px
  margin-top: 19px
  @include tablets
    display: none
  &__item
    list-style: none
    display: inline-flex
    font-size: 14px
    letter-spacing: .07em
    line-height: 16px
    &:not(:last-child)
      &:after
        content: '→'
        margin: 0px 4px
  &__link
    color: $red
    font-weight: 700
</style>
