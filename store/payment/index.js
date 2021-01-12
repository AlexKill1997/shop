import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'
export default {
    namespaced: true,
    state: () => ({
        userPaymentData: {},
        paymentComplete: false
    }),
    mutations,
    actions, 
    getters,
}