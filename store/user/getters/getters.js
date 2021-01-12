export default {
  GET_USER: ({ user }) => user,

  GET_VERIFIED: ({ verified }) => verified,

  GET_FILL_PERCENT: ({ user, weight }, getters, rootState, rootGetters) => {
    const ordersSum = rootGetters['orders/GET_AMOUNT']
    let fillCount = 0
    for (let key in weight) {
      if (user[key]) fillCount += weight[key]
    }
    if(ordersSum >= 100000) fillCount += 0.3
    return Math.ceil(fillCount * 100)
  },

  GET_CARD_ACCESS: (state, getters, rootState, rootGetters) => {
    const fillPercent = getters['GET_FILL_PERCENT']

    if (fillPercent >= 100) return true
    else return false
    // if (ordersSum >= 100000 && fillPercent >= 100) return true
    // else return false
  }
}
