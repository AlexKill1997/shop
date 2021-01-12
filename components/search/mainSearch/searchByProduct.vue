<template lang="pug">
    .search__product
      span.search__product-article {{product.article}}
      span.search__product-title {{product.title}}
      .search__product-cost.ruble
        div.search__product-cost__club {{product.club_cost}}&#8381; /
        div.search__product-cost__notclub &nbsp;{{product.cost}}&#8381;&nbsp;&nbsp;
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="sass">
@import '@/layouts/mixins.sass'
.search__product
  display: flex
  justify-content: space-between
  align-items: center

  &-article
    color: $red
    font-size: 14px
    font-weight: bold
    @include phones
      margin-right: 10px
  &-title
    height: 17px
    width: 75%
    overflow: hidden
    display: -webkit-box
    -webkit-line-clamp: 1
    -webkit-box-orient: vertical
    text-overflow: ellipsis
    font-size: 14px
    margin-left: 0
    @media screen and(max-width: 1720px)
      width: 72%
      margin-left: 12px
    @include phones
      width: 250px
  &-cost
    width: 112px
    color: $red
    font-size: 14px
    display: flex
    justify-content: flex-end
    @media screen and(max-width: 1500px)
      display: block
    @include phones
      display: none
    &__club, &__notclub
      text-align: right
    &__notclub
      color: black
</style>

