import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    counter: 1,
    isActive: false,
  }),
  computed: {
    ...mapGetters({
      REGION: "GET_CURRENT_CITY"
    }),
    inputControl: {
      get() {
        return this.item.counter
      },

      set(value) {
        const { item } = this
        this.SET_FAVORITES_ITEM_COUNTER({ item, value, method: 'set' })
      }
    },
    ...mapGetters('favorites', ['GET_FAVORITES']),
  },
  methods: {
    ...mapMutations('favorites', ['SET_FAVORITES_ITEM_COUNTER', 'REMOVE_FAVORITES', 'SET_FAVORITES', 'REMOVE_SELECTED']),

    clickFavoritesHandler() {
      this.isActive = !this.isActive

      let counter = this.counter

      if (this.isActive) {
        this.SET_FAVORITES({...this.item, counter, region: this.REGION.value })
      } else {
        this.REMOVE_FAVORITES(this.item)
        this.REMOVE_SELECTED(this.item)
      }
    },
    changeFavoriteCount(method, value) {
      const { item } = this
      this.SET_FAVORITES_ITEM_COUNTER({ item, value, method })
    },
  },
  watch: {
    GET_FAVORITES() {
        this.isActive = this.GET_FAVORITES.find(item => item.article === this.item.article) != undefined
    }
  },
  mounted() {
    this.isActive = this.GET_FAVORITES.find(item => item.article === this.item.article) != undefined
  }
}
