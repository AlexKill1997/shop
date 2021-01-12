import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'
export default {
    namespaced: true,
    state: () => ({
        mainSearch: {
            value: '',
            results: {
                products: [],
                categories: []
            },
            isRequestComplete: false
        },
        articleSearch: {
            value: "",
            articlePreviewField: [],
            isRequestComplete: false,
        }
    }),
    mutations,
    actions, 
    getters,
}