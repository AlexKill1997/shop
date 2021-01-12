import Vue from 'vue'

const recursiveSearchInRoutes = (id, array) => {
  let tmpCat = null
  array.forEach(item => {
    if (item._id === id) tmpCat = item
    item.children.forEach(sItem => {
      if (sItem._id === id) tmpCat = sItem
      sItem.children.forEach(gItem => {
        if(gItem._id === id) tmpCat = gItem
      })
    })
  })

  return tmpCat
}

const getRoute = Vue => {
  Vue.mixin({
    methods: {
      getRoute(id) {
        const routes = this.$store.getters['GET_MENU_ROUTES']

        const currentCat = recursiveSearchInRoutes(id, routes)

        if (currentCat) return currentCat.url
        else return ""
      },
      getCategory(id) {
        const routes = this.$store.getters['GET_MENU_ROUTES']

        const currentCat = recursiveSearchInRoutes(id, routes)

        return currentCat
      }
    }
  })
}

Vue.use(getRoute)