export default {
    SET_CART(state, payload) {
      state.cart = payload
    },
    
    ADD_TO_CART(state, item) {
      // TODO: проверять на существование в корзине
      state.cart = state.cart.concat(item)
      window.localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    CONCAT_CART(state, items) {
        state.cart = state.cart.concat(items)
        window.localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    CLEAR_CART(state) {
        state.cart = []
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    SET_ITEM_COUNTER(state, payload) {
        const { item, value, method } = payload
        const currentItemIndex = state.cart.indexOf(item)
        if(currentItemIndex == -1) return

        const currentItem = state.cart[currentItemIndex]
        switch (method) {
            case 'set':
            if (value < 1) currentItem.counter = 1
            else if (value > 999) currentItem.counter = 999
            else currentItem.counter = value
            break
            case "decrement":
            if (currentItem.counter - 1 >= 1) {
                currentItem.counter--
            }
            break;
            case "increment":
            if (currentItem.counter + 1 <= 999) {
                currentItem.counter++
            }
            break;
        }

        localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    REMOVE_ITEM(state, item) {
      const currentItem = state.cart.find(i => i.article === item.article)
      const index = state.cart.indexOf(currentItem)
      state.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

}
