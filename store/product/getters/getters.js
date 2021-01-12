export default {
    GET_PRODUCTS: ({ productsData }) => productsData,

    GET_ADDITIONAL_PRODUCTS: ({ additionalProducts }) => additionalProducts,

    PRODUCT_PROPERTIES: ({ productsProperties }) => productsProperties,

    GET_CATALOG_CONFIG: ({ catalogConfig }) => catalogConfig,

    GET_PAGE_NUMBER: ({ pageNumber }) => pageNumber,

    GET_LIMIT: ({ limit }) => limit,

    GET_SORT: ({ sort }) => sort,

    PRODUCT_FILTERS: ({ productsFilters }) => productsFilters,

    GET_CURRENT_PRODUCTS: ({ currentProduct }) => currentProduct,
    
    GET_WATCHEDITEMS: ({ watchedItems }, getters, rootState, rootGetters) => {
        const REGION = rootGetters['GET_CURRENT_CITY']
        const filteredWatchedItems = watchedItems.filter(item => item.region === REGION.value)
        const limitedItems = []

        let index = 0;
        for (let item of filteredWatchedItems) {
            if (index <= 5) limitedItems.push(item)
            index++;
        }
        return limitedItems
    }
}