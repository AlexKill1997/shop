import { mapGetters } from 'vuex'

export default {
  head() {
    return this.CATEGORY.meta ?
      this.$seo({
        title: this.CATEGORY.meta.title,
        keywords: this.CATEGORY.meta.keywords,
        description: this.CATEGORY.meta.description
      }) : {}
  },

  computed: {
    ...mapGetters({
      CATEGORY: 'category/GET_CURRENT_CATEGORY'
    })
  }
}