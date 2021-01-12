import axios from '~/services/axios'

export default {
    
    setProductArticleProducts({ commit }, payload) {
        commit('SET_ARTICLE_LIST', payload)
    },

    getArticleResponse({ commit }, article) {
        commit('RESET_SEARCH_ARTICLE')
        commit('SET_SEARCH_VALUE', article)
        commit('setLoading', true, { root: true })
        
        let url = `/api/searchByArticle/`
        return axios
            .post(url, {
                data: { article }
            })
            .then(response => {
                commit('SET_REQUEST_COMPLETE', true)
                commit('setLoading', false, { root: true })
                commit('SET_ARTICLE_LIST', response.data)
            })
            .catch(error => {
                return error
            })
    },

    getSearchResponse({ commit, state }) {
        // commit('SET_SEARCH_MAIN_VALUE', search)
        const search = state.mainSearch.value
        commit('setLoading', true, { root: true })
        
        let url = `/api/search/`
        return axios
            .post(url, {
                data: { search }
            })
            .then(response => {
                commit('SET_SEARCH_REQUEST_COMPLETE', true)
                commit('setLoading', false, { root: true })
                commit('SET_SEARCH_LIST', response.data)
            })
            .catch(error => {
                return error
            })
    }
}