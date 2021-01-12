import { mapMutations } from 'vuex'

export default {
  computed: {
    counterItemControls: {
      get() {
        return this.item.counter
      },
  
      set(value) {
        value = +value
        this.changeCount('set', value)
      }
    }
  },
  methods: {
    ...mapMutations('cart', ["SET_ITEM_COUNTER"]),
    changeCount(method, value) {
      const { item } = this;
      this.SET_ITEM_COUNTER({ item, value, method })
    },
    removeItem(item) {
      this.$store.dispatch('cart/removeItem', item)
      this.$emit('deleteItem')
    },
    refreshInput() {
      this.$refs.input.value = this.item.counter
    }
  }
}