import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart/index'
import favorites from './favorites/index'
import category from './category/index'
import product from './product/index'
import mainSearch from './search/index'
import auth from './auth/index'
import user from './user/index'
import orders from './orders/index'
import payment from './payment/index'
import callback from './callback/index'
import oneClick from './oneClick/index'
import axios from '~/services/axios'
import { uuid } from 'uuidv4'

export const eventBus = new Vue()

Vue.use(Vuex)
export const modules = {
  cart,
  favorites,
  category,
  product,
  mainSearch,
  user,
  auth,
  payment,
  callback,
  oneClick,
  orders
}

export const state = () => ({
  mainItems: {},
  mainDataLoaded: false,
  localDataInited: false,
  siteKey: process.env.RE_SITE_KEY,
  loading: true,
  currentCity: "",
  menuRoutes: [],
  menuDropdowns: {},
  page: 'index',
  previousPage: ''
})


export const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  },
  // update Pages from moddleware
  updatePages(state, page) {
    state.page = page
  },

  SET_LOCAL_DATA_INITED(state, payload) {
    state.localDataInited = payload
  },

  SET_CITY(state, data) {
    state.mainItems.regions.current = data
  },

  SET_CURRENT_CATEGORY_DROPDOWN(state, { cat, subcat }) {
    if (state.menuDropdowns[cat] !== undefined) {
      if (subcat) {
        state.menuDropdowns[cat][subcat].open = !state.menuDropdowns[cat][subcat].open
      }
      else {
        state.menuDropdowns[cat].open = !state.menuDropdowns[cat].open
      }
    }
  },

  SET_MENU_ROUTES(state, payload) {
    const routes = payload
    
    routes.forEach(route => {
      route.children.forEach(sRoute => {
        sRoute.parent_id = route._id
        sRoute.children.forEach(gRoute => {
          gRoute.parent_id = sRoute._id
        })
      })
    })
    state.menuRoutes = routes
  },

  SET_MENU_DROPDOWNS(state, payload) {
    state.menuDropdowns = payload
  },

  SET_MAIN_CONTENT(state, payload) {
    state.mainItems = payload
  },

  SET_MAIN_DATA_LOADED(state, payload) {
    state.mainDataLoaded = payload
  },
  ADD_BRANDS(state, payload) {
    state.mainItems.brands = state.mainItems.brands.concat(payload)
  },

  // TODO:
  UPDATE_MAIN_DATA_FIELD(state, { key, value }) {
    state.mainItems[key] = value
  }
}

export const getters = {
  GET_CURRENT_CITY: ({ mainItems }) => mainItems.regions ? mainItems.regions.current : false,

  GET_REGIONS: ({ mainItems }) => mainItems.regions.options,

  GET_MENU_ROUTES: ({ menuRoutes }) => menuRoutes,

  GET_MAIN_CONTENT: ({ mainItems }) => mainItems,

  GET_MAIN_DATA_LOADED: ({ mainDataLoaded }) => mainDataLoaded,

  GET_LOCAL_DATA_INITED: ({ localDataInited }) => localDataInited,

  GET_CURRENT_CATEGORY_MENU: ({ menuRoutes }) => slug => menuRoutes.find(route => route.cSlug === slug).children || [],

  GET_CURRENT_CATEGORY: ({ menuRoutes }) => slug => {
    const localCat = menuRoutes.find(route => route.cSlug === slug)
    if (!localCat) return null
    
    const cat = JSON.parse(JSON.stringify(localCat))
    cat.main = true
    cat.subcategories = cat.children

    return cat
  },
  
  GET_PAGE: ({ page }) => page,

  GET_LOADING: ({ loading }) => loading,

  GET_SITE_KEY: ({ siteKey }) => siteKey
}

export const actions = {
  async setCityMiddleware({ commit, state }, { $axios, region, skipReg }) {
    const { data } = await $axios.get(`/api/setRegion/${region || ""}${skipReg ? `?=skipReg=true`: ""}`)
    return data
  },
  // устанавливает значение текущего города в хранилище
  async setCity({ commit, dispatch, state }, { region, router }) {
    const { value } = region
    axios.get(`/api/setRegion/${value}`)
      .then(async ({ data }) => {
        // dispatch("getMenuRoutes", routes)
        commit('SET_CITY', region)
        await dispatch("fetchData", { $axios: axios, region: value })
        let result;

        const route = router.currentRoute
        
        switch (true) {
          case state.page.includes("products"):
            router.push("/")
          break;
          case state.page.includes("checkout"):
            router.push("/")
          break;
          case state.page.includes("catalog"):
            const url_1 = route.path.replace(/\/region\/.+?\//, `/region/${region.value}/`)

            router.push(url_1)
            break;
          
          case state.page.includes("brands"):
            const url_2 = route.path.replace(/\/region\/.+?\//, `/region/${region.value}/`)
            break
        }

    })
  },

  getMenuRoutes({ commit }, data) {
    commit('SET_MENU_ROUTES', data)
    const dropList = {}
    for (const drop of data) {
      dropList[drop.cSlug] = { open: false }
      for (const dropItem of drop.children) {
        dropList[drop.cSlug][dropItem.cSlug] = { open: false }
      }
    }
    commit('SET_MENU_DROPDOWNS', dropList)
  },

  async fetchData({ commit, dispatch }, { $axios, region }) {
    const { data } = await $axios.get(`/api/mainData${region ? `?region=${region}` : ''}`)

    const { menuRoutes, regions, brands } = data

    dispatch('getMenuRoutes', menuRoutes)

    commit('product/SET_ADDITIONAL_PRODUCTS', {
      popularItems: data.popularItems.map(p => ({ ...p, id: uuid(), counter: 1, type: 'popular' })),
      salesItems: data.salesItems.map(p => ({ ...p, id: uuid(), counter: 1, type: 'sales' }))
    })

    commit('SET_MAIN_CONTENT', {
      brands,
      regions
    })

    commit('SET_MAIN_DATA_LOADED', true)

    return data
  },

  async getBrands({ commit }) {
    const { data } = await axios.get("/api/brands/count")
    const { count: brandsCount } = data

    const loops = brandsCount / 5

    for (let i = 0; i < loops; i++) {
      const count = async () => {
        const { data } = await axios.get(`/api/brands/get?skip=${i * 5}`)
        const { brands } = data
        commit("ADD_BRANDS", brands)
      }
      count()
    }
  }
}
