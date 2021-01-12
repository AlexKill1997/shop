import axios from '~/services/axios'

export default {
  sendFooterCallBackUser({ commit }, user) {
    commit('RESET_CALLBACK_DATA')
    let url = `/api/callback/`
    let formType = 'Обратный звонок'
    return axios
      .post(url, {
        data: { user, formType }
      })
      .then(response => {
        commit('SET_CALLBACK_COMPLETE', true)
        commit('SET_CALLBACK_DATA', response.data)
      })
      .catch(error => {
        return error
      })
  },

  sendHeaderCallBack({commit}, client) {
    commit('RESET_HEADER_CALLBACK_DATA')
    let url = `/api/freeCall/`
    let formType = 'Обратный звонок'
    return axios
      .post(url, {
        data: { client, formType }
      })
      .then(response => {
        commit('SET_HEADER_CALLBACK_COMPLETE', true)
        commit('SET_HEADER_CALLBACK_DATA', response.data)
      })
  },

  sendHeaderPayment({ commit }, paymentClient) {
    commit('RESET_HEADER_CALCULATION_COMPLETE')
    let url = `/api/calculate/`
    return axios
      .post(url, paymentClient)
      .then(response => {
        commit('SET_HEADER_CALCULATION_COMPLETE', true)
        commit('SET_HEADER_CALCULATION', response.data)
      })
  }
}