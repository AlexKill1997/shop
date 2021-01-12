export default {
    GET_CURRENT_CATEGORY: ({ currentCategory }) => currentCategory,

    GET_CHANGED: ({ changed }) => changed,

    GET_CATEGORY_ROUTES: ({ routes }) => routes,

    IS_PRODUCTS_CATALOG: ({ routes }) => {
        let tmp = false
        for (let key in routes) {
            if(routes[key]) tmp = true
        }
        return tmp
    },

    GET_LOADING: ({ loading }) => loading,

    GET_VIEWS_CATEGORY: ({ viewsCategory }) => viewsCategory
}