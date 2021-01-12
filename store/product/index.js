import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'
export default {
    namespaced: true,
    state: () => ({
        productsData: [],
        catalogConfig: {},
        pageNumber: 1,
        sortMethod: "price-up",
        limit: "15",
        additionalProducts: {
            popularItems: [],
            salesItems: [],
            currentProductSameItems: [],
            currentProductBuyedItems: []
        },
        productsProperties: {},
        productsFilters: {},
        tmpFiltersQuery: "",
        currentProduct: {},
        watchedItems: []
    }),
    
    mutations,
    actions,
    getters,
}