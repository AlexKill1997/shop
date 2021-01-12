import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'
export default {
    namespaced: true,
    state: () => ({
        callback: {
            footer: {
                callbackData: {},
                callbackComplete: false,
            },
            header: {
              headercallback: {},
              headercallbackComplete: false
            },
        },
        calculation: {
            headercalculation: {},
            headercalculationComplete: false
        }
    }),
    mutations,
    actions, 
    getters,
}