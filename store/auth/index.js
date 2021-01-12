import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'
export default {
    namespaced: true,
    state: () => ({
        userData: {
            // userName: '',
            // userLastName: '',
            userPhone: '',
            recoverUser: ''
        },
        authPopup: false
    }),
    mutations,
    actions, 
    getters,
}