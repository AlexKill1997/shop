import { v4 as uuid } from "uuid"

export default {
    SET_SEARCH_VALUE(state, payload) {
        state.articleSearch.value = payload
    },

    SET_ARTICLE_LIST(state, payload) {
        state.articleSearch.articlePreviewField = payload.map(item => ({ ...item, id: uuid() }))
    },

    RESET_SEARCH_ARTICLE(state) {
        state.articleSearch.articlePreviewField = []
        state.articleSearch.isRequestComplete = false
        state.articleSearch.value = ''
    },

    SET_REQUEST_COMPLETE(state, payload) {
        state.articleSearch.isRequestComplete = payload
    },


    SET_SEARCH_MAIN_VALUE(state, payload) {
        state.mainSearch.value = payload
    },

    SET_SEARCH_LIST(state, payload) {
        for (let key in payload) {
            state.mainSearch.results[key] = payload[key]
        }
    },

    RESET_MAIN_SEARCH(state) {
        state.mainSearch.results.products = []
        state.mainSearch.results.categories = []
        state.mainSearch.isRequestComplete = false
        state.mainSearch.value = ''
    },

    SET_SEARCH_REQUEST_COMPLETE(state, payload) {
        state.mainSearch.isRequestComplete = payload
    }
}