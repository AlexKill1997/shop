<template lang="pug">
  .cardSearchArticleSmall
    .cardSearchArticleSmall__container
      .article
        span.article-value {{ item.article }}
        .title__wrapper
          span.cardSearchArticleSmall__container__heading--title {{ item.title }}
      .cost__wrapper
        span.cardSearchArticleSmall__container__heading--cost.ruble {{ item.cost }}&#8381; /
        span.cardSearchArticleSmall__container__heading--clubCost.ruble  {{ item.club_cost }}&#8381;
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

.cardSearchArticleSmall
  .cardSearchArticleSmall__container
    display: flex
    align-items: center
    justify-content: space-between
    border: 2px solid #bab4b4
    border-top: none
    padding: 0 5px
    height: 57px
    cursor: pointer
    &__heading--title
      width: 500px
      justify-content: flex-end
      align-items: center
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
      overflow: hidden
      text-overflow: ellipsis
      @include phones
        width: 240px
        font-size: 13px
      @media screen and(max-width: 365px)
        width: 170px
      @media screen and(max-width: 330px)
        width: 160px

    .article-value
      color: $red
      font-weight: bold
      margin-right: 10px
      @include phones
        font-size: 14px
    .cardSearchArticleSmall__container__heading--cost
      color: $red
      font-weight: bold
      @include phones
        font-size: 14px
    .cardSearchArticleSmall__container__heading--clubCost
      color: black
      font-weight: bold
      @include phones
        font-size: 14px
    .cost__wrapper
      width: 112px
      display: flex
      justify-content: flex-end
      @include phones
        width: inherit
        align-items: flex-end
        flex-direction: column
      span
        white-space: nowrap

  .article
    display: flex
</style>
