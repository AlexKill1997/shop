export default {
  SET_FAVORITES_ITEM_COUNTER(state, payload) {
    const { item, value, method } = payload
    const currentItemIndex = state.favoriteProducts.indexOf(item)
    if (currentItemIndex == -1) return
    const currentItem = state.favoriteProducts[currentItemIndex]
    currentItem.counter = currentItem.counter || 1
    switch (method) {
      case 'set':
        if (value < 1) currentItem.counter = 1
        else if (value > 999) currentItem.counter = 999
        else currentItem.counter = value
        break
      case 'decrement':
        if (currentItem.counter - 1 >= 1) {
          currentItem.counter--
        }
        break
      case 'increment':
        if (currentItem.counter + 1 <= 999) {
          currentItem.counter++
        }
        break
    }
    localStorage.setItem(
      'favoriteProducts',
      JSON.stringify(state.favoriteProducts)
    )
  },

  ADD_TO_SELECTED(state, article) {
    const item = state.favoriteProducts.find(item => item.article === article)
    if (item) {
      state.selectedItems.push(item)
    }
  },

  REMOVE_SELECTED(state, article) {
    const index = state.selectedItems.findIndex(item => item.article === article)
    state.selectedItems.splice(index, 1)
  },

  RESET_SELECTED(state) {
    state.selectedItems = []
  },

  SET_FAVORITES(state, payload) {
    state.favoriteProducts = state.favoriteProducts.concat(payload)
    localStorage.setItem('favorites', JSON.stringify(state.favoriteProducts))
  },

  REMOVE_FAVORITES(state, items) {
    if (items)
      switch (items.constructor) {
        case Array:
          if (items.length == state.favoriteProducts.length) {
            state.favoriteProducts = []
          } else {
            for (let i = 0; i < items.length; i++) {
              let currItems = state.favoriteProducts.find(
                (item) => item.article === items[i].article
              )
              const index = state.favoriteProducts.indexOf(currItems)
              state.favoriteProducts.splice(index, 1)
              localStorage.setItem(
                'favorites',
                JSON.stringify(state.favoriteProducts)
              )
            }
          }
          break

        case Object:
          const currentItem = state.favoriteProducts.find(
            (i) => i.article === items.article
          )
          const index = state.favoriteProducts.indexOf(currentItem)
          state.favoriteProducts.splice(index, 1)
          localStorage.setItem(
            'favorites',
            JSON.stringify(state.favoriteProducts)
          )
          break
      }
  }
}
