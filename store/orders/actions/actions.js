import axios from "~/services/axios"

export default {
  async getOrders({ commit }, { $axios = axios, query = {} }) {
    const { data } = await $axios.get(`/api/orders${query.page ? `?page=${query.page}` : ""}`)
    const { orders, count, amount } = data
    if (data) {
      commit("SET_ORDERS", orders)
      commit('SET_ORDERS_COUNT', count)
      commit('SET_AMOUNT', amount)

      return Promise.resolve()
    }
  },

  async verifyManager( _, manager ) {
    const { data } = await axios.get(`/api/orders/manager/${manager}`)
    return data
  }
}