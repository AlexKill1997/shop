import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'

export default {
    namespaced: true,
    state: () => ({
        orders: [],
        currentOrder: {},
        currentOrderIndex: 0,
        ordersCount: 0,
        pageNumber: 1,
        ordersLimit: 5,
        amount: 0
    }),
    mutations,
    actions, 
    getters,
}