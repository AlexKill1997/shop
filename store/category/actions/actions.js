import axios from '~/services/axios'

export default {
    setCurrentCategory({ commit }, category) {
      commit('SET_CURRENT_CATEGORY', category)
    },

    getCategories({ commit }, categoryName) {
      axios.get(`/api/category/${categoryName}`).then(res => {
        commit('GET_CATEGORIES', res.data)
      })
    },

    getMenuRoutes({ commit }, data) {
      commit('SET_MENU_ROUTES', data)
      const dropList = {}
      for (const drop of data) {
        dropList[drop.categoryName] = { open: false }
        if (drop.children)
          for (const dropItem of drop.children) {
            dropList[drop.categoryName][dropItem.subcategoryName] = { open: false }
          }
      }
      commit('SET_MENU_DROPDOWNS', dropList)
    },

    getViewsCategory({ commit }, categoryName) {
      axios.get(`/api/category/${categoryName}`).then(res => {
        commit('SET_VIEWS_CATEGORY', res.data)
      })
    }
}