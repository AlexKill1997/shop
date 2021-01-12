import { v4 as uuid } from 'uuid'
import axios from '~/services/axios'

let timer = null

export default {
  async getProducts({ commit, dispatch, state, rootGetters }, params) {
    dispatch('getQueryString')
    
    const localAxios = params.axios || axios

    commit('setLoading', true, { root: true })
    const { category, subcategory, grandcategory, region } = rootGetters['category/GET_CATEGORY_ROUTES']
    const { isAppendproducts, query } = params
    const { limit, sort } = state
    let url = `/api/getProducts/${category}${subcategory ? `/${subcategory}` : ''}${grandcategory ? `/${grandcategory}` : ''}`


    query.sort = sort
    query.limit = limit
    if(region) query.region = region

    if (query) {
      url += '?'
      for (let param in query) {
        if (query[param]) url += `${param}=${query[param]}&`
      }
    }
    url = url.replace(/&$/, '')

    const filtersQuery = state.tmpFiltersQuery

    url += filtersQuery ? `&${filtersQuery}` : ''

    return localAxios
      .get(url)
      .then((response) => {
        if (response.data.status === false) return null
        
        if (!query.preload) {
          commit('category/UPDATE_CATEGORY_COUNT', response.data.info.count, {
            root: true
          })
        }
        else {
          commit('category/SET_CURRENT_CATEGORY', response.data.info, {
            root: true
          })
        }
        dispatch('setProductsData', {
          data: response.data.products,
          isAppendproducts
        })

        commit('setLoading', false, { root: true })

        return response.data
      })
      .catch((error) => {
        return error
      })
  },

  async getBrandProducts({ commit, dispatch, state, rootGetters }, params) {
    dispatch('getQueryString')

    const localAxios = params.axios || axios

    commit('setLoading', true, { root: true })
    const { brand, region } = rootGetters['category/GET_CATEGORY_ROUTES']
    const { query, isAppendproducts } = params
    const { sort, limit } = state
    let url = `/api/brands/${brand}`

    query.sort = sort
    query.limit = limit
    if(region) query.region = region
    
    if (query) {
      url += '?'
      for (let param in query) {
        if (query[param]) url += `${param}=${query[param]}&`
      }
    }
    url = url.replace(/&$/, '')
    const filtersQuery = state.tmpFiltersQuery
    url += filtersQuery ? `&${filtersQuery}` : ''

    return localAxios
      .get(url)
      .then((response) => {
        if(!response.data.status === false) return false

        if (!query.preload) {
          commit('category/UPDATE_CATEGORY_COUNT', response.data.info.count, {
            root: true
          })
        }
        else {
          commit('category/SET_CURRENT_CATEGORY', response.data.info, {
            root: true
          })
        }

        dispatch('setProductsData', {
          data: response.data.products,
          isAppendproducts
        })
        
        commit('setLoading', false, { root: true })

        return response.data
      })
      .catch((error) => {
        return error
      })
  },

  // async getProductsFilters({ commit, state, dispatch }, params) {
  //   const { category, subcategory } = params
  //   let url = `/api/getFilters/category/${category}${
  //     subcategory ? `/${subcategory}` : ''
  //   }`

  //   return axios.get(url).then((response) => {
  //     dispatch('setProductsProperties', response.data)
  //     commit('setLoading', false, { root: true })
  //   })
  // },

  async countCategoryProducts({ commit, state, rootGetters }, { item, url, key }) {
    if (rootGetters['category/GET_LOADING']) return
    
    // console.log(url)
    
    const reqUrl = url.replace(/(\/catalog\/region\/.*\/category\/|\/catalog\/category\/)/, '')

    if(!reqUrl) return

    const { data } = await axios.get(`/api/categories/countProducts/${reqUrl}`)
    const { count } = data

    commit('category/UPDATE_CURRENT_CATEGORY_FIELD', {
      id: item._id, mainKey: key, key: 'products', value: count
    },
    {
      root: true
    })
  },

  setProductsProperties({ commit, state, dispatch }, payload) {
    commit('SET_PRODUCTS_PROPERTIES', payload)
  },

  // async getBrandProductsFilters({ commit, state, dispatch }, params) {
  //   const { brand } = params
  //   let url = `/api/getFilters/brand/${brand}`
  //   return axios.get(url).then((response) => {
  //     dispatch('setProductsProperties', response.data)
  //     commit('setLoading', false, { root: true })
  //   })
  // },

  getQueryString({ state, commit }, query) {
    let str = ''

    const filters = state.productsFilters
    for (let key in filters) {
      const filter = filters[key].value
      switch (filter.constructor) {
        case Object:
          if (!filters[key].changed) break
          str += `${key}=${filter.min}-${filter.max}&`
          break
        case Array:
          filter.forEach((filterItem) => {
            if (filterItem.value) str += `${key}[]=${filterItem.name}&`
          })
          break
      }
    }

    str = str.replace(/&$/, '')

    commit('SET_FILTERS_QUERY', str)
  },

  // формирует список фильтров
  setProductsFilters({ commit, state }, payload) {
    const propRanges = state.productsProperties
    const filterValues = {}

    for (const prop in propRanges) {
      const tempArray = []
      filterValues[prop] = {}
      filterValues[prop].opened = false
      switch (propRanges[prop].constructor) {
        case Object:
          filterValues[prop].changed = false
          filterValues[prop].value = propRanges[prop]
          break

        case Array:
          for (const item in propRanges[prop]) {
            tempArray.push({ name: propRanges[prop][item], value: false })
          }
          filterValues[prop].value = JSON.parse(JSON.stringify(tempArray))
          break
      }
    }
    commit('SET_PRODUCTS_FILTER_VALUES', {
      method: 'reload',
      params: { value: filterValues }
    })
  },

  setProductsData({ commit }, payload) {
    const { isAppendproducts, data } = payload
    
    const newData = data.map((product) => ({
      ...product,
      counter: 1,
      type: 'main',
      id: uuid()
    }))
    isAppendproducts
      ? commit('ADD_PRODUCTS_DATA', newData)
      : commit('SET_PRODUCTS_DATA', newData)
  },

  async countProducts({ dispatch, state, rootGetters }, routeMiddleware) {
    const { region } = rootGetters['category/GET_CATEGORY_ROUTES']
    const { subcategories, neighbors } = rootGetters['category/GET_CURRENT_CATEGORY']
      
    const getRoute = (route) => `${route}${region ? `?region=${region}` : ''}`

    if (subcategories && subcategories.length > 0) {
      subcategories.forEach(async subcategory => {
        await dispatch('countCategoryProducts', {
          item: subcategory,
          url: getRoute(routeMiddleware(subcategory._id)),
          key: 'subcategories'
        })
      })
    }

    else if (neighbors && neighbors.length > 0) {
      neighbors.forEach(async neighbor => {
        await dispatch('countCategoryProducts', {
          item: neighbor,
          url: getRoute(routeMiddleware(neighbor._id)),
          key: 'neighbors'
        })          
      })
    }
  },
  
  setWatchedItems({ commit, rootGetters }, payload) {
    const REGION = rootGetters['GET_CURRENT_CITY']

    clearTimeout(timer)

    timer = setTimeout(() => {
      commit('ADD_WATCHED_ITEM', { region: REGION.value, product: payload })
      console.log('13')
    }, 200)
  }
}
