import axios from '~/services/axios'

export default {
    getUserResponse( { commit }, user) {
        let url = `/api/auth/`
        return axios
            .post(url, {
                data: { user }
            })
            .then(response => response.data)

            .then(axiosData => {
                const { type, data } = axiosData
                if (type === 'success') {
                    commit("user/SET_USER", data.user, { root: true })
                    return true
                }
            })
            .catch(error => {
                return error
            })
    },

    getRecoverResponse( { commit }, phone) {
        commit('DELETE_RECOVER')
        let url = `/api/auth/recover/`
        return axios
          .post(url, {
              data: { phone }
          })
          .then(response => response.data)
        
          .then(axiosData => {
            const { type } = axiosData
            if (type === 'success') {
                return true
            }
          })
          .catch(error => {
              return error
          })
    },

    getLoginUser({ commit }, user) {
        return axios
          .post("/api/auth/login", {
              data: user
          })
          .then(response => response.data)
          .then(axiosData => {
            const { type, data } = axiosData
            if (type === 'success') {
                commit("user/SET_USER", data.user, { root: true })
                return true
            }
          })
          .catch(error => {
              return error
          })
    },

    userLogout({ commit }) {
        return axios
          .get("/api/auth/logout")
          .then(response => response.data)
          .then(axiosData => {
            const { type } = axiosData
            if (type === 'success') {
                commit("user/SET_USER", null, { root: true })
                return true
            }
          })
          .catch(error => {
            return error
          })
    }
}