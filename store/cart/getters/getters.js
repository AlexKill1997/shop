export default {
  GET_PRODUCTS_FROM_CART: ({ cart }, getters, rootState, { GET_CURRENT_CITY: REGION }) => {
    return cart.filter(product => product.region === REGION.value)
  },

  IS_IN_CART: (state, { GET_PRODUCTS_FROM_CART: cart }, rootState, { GET_CURRENT_CITY: REGION }) => item => {
    return !!cart.find(product => (
      product.article === item.article && product.region === REGION.value
    )
  )},
    
  GET_AMOUNT(_, { GET_PRODUCTS_FROM_CART: cart }) {
      let tmp = 0;
      cart.forEach(item => {
        tmp = tmp + item.counter * (item.discount_price ? item.discount_price : item.cost)
      })
  
      return tmp.toFixed(2)
    },
}