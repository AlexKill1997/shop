<template lang="pug">
.v-article-search
  .v-article__parent-popup(@click='closePopup')
  .v-popup__article
    .v-popup__article_wrapper
      .v-popup__article_header
        h2 Соберите заказ по номеру артикула:
        img.v-popup__article-closeIcon(
          :src='require("../../assets/images/icons/close_mark.svg")',
          title='Закрыть окно',
          alt='Закрыть',
          @click='closePopup'
        )
      .v-popup__article_content
        .v-popup__article_content_search-field
          Searcharticle
</template>

<script>
import { mapMutations } from 'vuex'
import Searcharticle from '@/components/search/search-article/searchbyarticle'

export default {
  name: 'popupArticle',
  components: { Searcharticle },
  methods: {
    ...mapMutations({
      resetResults: 'search/RESET_SEARCH_ARTICLE',
      resetSearchValue: 'search/SET_SEARCH_VALUE'
    }),
    closePopup() {
      this.$emit('close')
      this.resetResults()
      this.resetSearchValue('')
    }
  }
}
</script>

<style lang="sass">
@import '@/layouts/mixins.sass'
.v-article-search
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  width: 100vw
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  z-index: 2000
.v-article__parent-popup
  background-color: rgba(0, 0, 0, .46)
  position: fixed
  display: flex
  align-items: center
  justify-content: center
  left: 0
  top: 0
  right: 0
  bottom: 0
  width: 100vw
  height: 100vh
  z-index: 10
.v-popup__article
  z-index: 20
  &_wrapper
    width: 700px
    background: white
    padding: 10px
    position: relative
    border: 10px solid #f6f6f6
    @include phones
      width: 315px
      padding: 10px
      height: auto
    .v-popup__article_header

      display: flex
      justify-content: center
      @include phones
        margin-top: 10px
      h2
        margin: 0
        margin-bottom: 20px
        font-size: 18px
        @include phones
          font-size: 14px
      .v-popup__article-closeIcon
        position: absolute
        top: 3px
        right: 3px
        cursor: pointer
      span
        position: relative
        top: 26px
        left: 141px
        cursor: pointer
        font-size: 20px
    .v-popup__article_content
      display: flex
      justify-content: center
      &_search-field
        width: 100%
        input
          width: 650px
          height: 32px
          outline-color: $red
          color: $red
          @include phones
            font-size: 14px
</style>
