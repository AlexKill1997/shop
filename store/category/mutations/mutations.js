export default {
  SET_CURRENT_CATEGORY(state, cat) {
    if (!cat) {
      state.currentCategory = {}
    }
    else {
      state.currentCategory = cat
      state.changed = state.changed + 1
      console.log('STATE')
    }
  },

  CLEAR_CATEGORY(state) {
    state.currentCategory = {}
  },

  SET_PRODUCTS_CATEGORY(state, data) {
    state.currentCategory = data
  },

  SET_CATEGORY_ROUTES(state, data) {
    state.routes = data
  },

  UPDATE_CATEGORY_COUNT(state, data) {
    state.currentCategory.count = data
  },

  UPDATE_CURRENT_CATEGORY_FIELD(state, data) {
    if (state.loading) return
    
    const { id, key, mainKey, value } = data

    const { currentCategory } = state

    const categoryCopy = JSON.parse(JSON.stringify(currentCategory))

    if (categoryCopy[mainKey]) {
      const categoryFieldToUpdate = categoryCopy[mainKey].find(subcat => subcat._id === id)
      categoryFieldToUpdate[key] = value

      state.currentCategory = categoryCopy
    }
  },

  SET_LOADING(state, payload) {
    state.loading = payload
  },

  RESET_DATA(state) {
    state.routes = {}
  },

  SET_VIEWS_CATEGORY(state, payload) {
    state.views = payload
  }
}
