<template lang="pug">
  .cardSearchArticle
    .article
      span.article-value {{ item.article }}
    .title__wrapper
      span.cardSearchArticle__container__heading--title {{ item.title }}
    .cost__wrapper
      span.cardSearchArticle__container__heading--cost.ruble {{ item.cost }}&#8381; /
      span.cardSearchArticle__container__heading--clubCost.ruble   {{ item.club_cost }}&#8381;&nbsp;&nbsp;
</template>

<script>

export default {
  name: 'ItemHorizontalnoPic',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    isBuyPopupVisible: false
  })
}
</script>
<style lang="sass">
@import '@/layouts/mixins.sass'

.cardSearchArticle
  display: flex
  justify-content: space-between
  align-items: center
  border: 2px solid #bab4b4
  border-top: none
  padding: 0 5px
  height: 57px
  cursor: pointer
  .title__wrapper
    &__heading--title
    width: 450px
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    overflow: hidden
    text-overflow: ellipsis
    font-weight: bold
    @include phones
      font-size: 14px
      text-align: center
      width: 170px
  .article-value
    color: $red
    font-weight: bold
    @include phones
      font-size: 14px
  .cardSearchArticle__container__heading--cost
    color: $red
    font-weight: bold
    @include phones
      font-size: 14px
  .cardSearchArticle__container__heading--clubCost
    font-size: 14px
  .cost__wrapper
    width: 112px
    display: flex
    justify-content: flex-end
    @include phones
      width: inherit
      align-items: flex-end
      flex-direction: column
</style>
