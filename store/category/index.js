import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'
export default {
    namespaced: true,
    state: () => ({
        currentCategory: {},
        routes: {},
        changed: 0,
        loading: false,
        viewsCategory: {}
    }),
    
    mutations,
    actions,
    getters,
}