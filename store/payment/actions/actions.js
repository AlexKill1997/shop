import axios from '~/services/axios'

export default {
    getDeliveryResponse({ commit, rootGetters }, buyer) {
      commit('setLoading', true, { root: true })
      commit('RESET_DATA_PAYMENT')
      let url = `/api/payment/`
      return axios
        .post(url, {
          data: { buyer }
        })
        .then(response => {
          commit('setLoading', false, { root: true })

          const { data } = response
          if (data) {
            const { status, user } = data
            if (status) {
              commit('SET_PAYMENT_COMPLETE', true)
              commit('SET_PAYMENT_DATA', response.data)
              if (!rootGetters['user/GET_USER']) commit('user/SET_USER', response.data.user, { root: true })
              
              return true
            }
            else {
              return false
            }
          }
        })
        .catch(error => {
          commit('setLoading', false, { root: true })
          return error
        })
    }
}