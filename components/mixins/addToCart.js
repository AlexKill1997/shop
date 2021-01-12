import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cart: "cart/GET_PRODUCTS_FROM_CART",
      isInCart: "cart/IS_IN_CART",
      REGION: 'GET_CURRENT_CITY'
    }),
    counterItemControls: {
      get() {
        return this.item.counter
      },

      set(value) {
        const { item } = this
        value = +value
        this.SET_PRODUCT_COUNT({ item, value, method: 'set' })
      }
    }
  },
  methods: {
    ...mapMutations('cart', ['ADD_TO_CART', 'CONCAT_CART']),
    ...mapMutations('favorites', ['REMOVE_FAVORITES']),
    ...mapMutations('product', ['SET_PRODUCT_COUNT']),

    addToCart() {
      let item = this.item
      this.ADD_TO_CART({ ...item, region: this.REGION.value })
      this.$vToastify.success('',"Товар добавлен в корзину!")
    },

    concatCart(items){
      // добавление работает корректно 1) добавляются все товары и те что отмечены галочкой
      this.CONCAT_CART(items.map(item => ({...item, region: this.REGION.value})))
      this.REMOVE_FAVORITES(items)
    },

    removeItem(item) {
      this.$store.dispatch('cart/removeItem', item)
      this.SET_PRODUCT_COUNT({ item, value: 1, method: 'set' })
      this.$vToastify.error('',"Товар удален из корзины!")
    },

    changeProductCount(method, value) {
      const { item } = this
      this.SET_PRODUCT_COUNT({ item, value, method })
    },
  }
}
