import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      CATEGORY: 'category/GET_CURRENT_CATEGORY'
    })
  }
}