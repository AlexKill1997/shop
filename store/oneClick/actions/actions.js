import axios from '~/services/axios'

export default {
  getOrderClick({ commit }, item) {
    commit('RESET_DATA_ORDER')
    commit('SET_ORDER_DATA', item)
    let url = `/api/order/`
    return axios
      .post(url, {
        data: { item }
      })
      .then(response => {
        commit('SET_ORDER_COMPLETE', true)
        commit('SET_ORDER_DATA', response.data)
      })
      .catch(error => {
        return error
      })
    }
}