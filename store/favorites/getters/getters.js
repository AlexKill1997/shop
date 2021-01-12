export default {
  GET_FAVORITES: ({ favoriteProducts }, rootState, getters, { GET_CURRENT_CITY: REGION }) => {
    return favoriteProducts.filter(product => product.region === REGION.value)
  },

  GET_SELECTED: ({ selectedItems }) => selectedItems,

  GET_FAVORITES_SUMMARY: ({ favoriteProducts, selectedItems }) => {
    const array = selectedItems.length > 0 ? selectedItems : favoriteProducts
    return array.reduce((prev, current) => {
      let newPrice = 0
      if (current.cost.constructor === Number)
        newPrice = prev + current.counter * (current.discount_price ? current.discount_price : current.cost)
      return Math.floor(newPrice * 100) / 100 
    }, 0)
  },
  
  GET_CHECKED_STATUS({ selectedItems }) {
    return (item) => {
      const element = selectedItems.find(i => i.article === item.article)
      if(element) return true
      else return false
    }
  },
}