import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'
export default {
  namespaced: true,
  state: () => ({
    user: null,

    weight: {
      name: 0.1,
      lastname: 0.1,
      phone: 0.25,
      email: 0.1,
      birthday: 0.15,
      order: 0.3
    },
    verified: false
  }),
  mutations,
  actions,
  getters
}
