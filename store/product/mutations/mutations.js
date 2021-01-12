export default {
  SET_PRODUCTS_DATA(state, data) {
    state.productsData = data
  },

  SET_ADDITIONAL_PRODUCTS(state, data) {
    const newAdditional = data
    const additionalProducts = JSON.parse(JSON.stringify(state.additionalProducts))
    for (let key in newAdditional) {
      additionalProducts[key] = newAdditional[key]
    }

    state.additionalProducts = additionalProducts
  },
  
  ADD_PRODUCTS_DATA(state, data) {
    state.productsData = state.productsData.concat(data)
  },

  CLEAR_PRODUCTS_DATA(state) {
    state.productsData = []
  },

  SET_PRODUCTS_PROPERTIES(state, payload) {
    state.productsProperties = JSON.parse(JSON.stringify(payload))
  },

  SET_FILTERS_QUERY(state, payload) {
    state.tmpFiltersQuery = payload
  },

  SET_PRODUCT_COUNT(state, payload) {
    const { item, value, method } = payload
    let productsArray

    switch (item.type) {
      case "page":
        productsArray = [state.currentProduct]
        break;
      case "popular":
        productsArray = state.additionalProducts.popularItems
        break;
      case "sales":
        productsArray = state.additionalProducts.salesItems
        break;
      case "currentSame":
        productsArray = state.additionalProducts.currentProductSameItems
        break;
      case "currentBuyed":
        productsArray = state.additionalProducts.currentProductBuyedItems
        break;
      case "watched":
        productsArray = state.watchedItems
        break;
      default:
        productsArray = state.productsData
        break;
    }

    const currentItemIndex = productsArray.indexOf(item)
    
    if(currentItemIndex == -1) return

    const currentItem = productsArray[currentItemIndex]

    switch (method) {
        case 'set':
        if (value < 1) currentItem.counter = 1
        else if (value > 999) currentItem.counter = 999
        else currentItem.counter = value
        break
        case "decrement":
        if (currentItem.counter - 1 >= 1) {
            currentItem.counter--
        }
        break;
        case "increment":
        if (currentItem.counter + 1 <= 999) {
            currentItem.counter++
        }
        break;
      }
  },

  SET_PRODUCTS_FILTER_VALUES(state, payload) {
    const { method, params } = payload
    switch (method) {
      case 'reload':
        state.productsFilters = JSON.parse(JSON.stringify(params.value))
        break
      case 'checkbox':
        state.productsFilters[params.parent].value.find(
          (elem) => elem.name === params.key
        ).value = params.value
        break
      case 'input':
        state.productsFilters[params.parent].changed = true
        state.productsFilters[params.parent].value[params.key] = +params.value
        break
      case 'opener':
        state.productsFilters[params.key].opened = params.value
        break
    }
  },

  SET_CURRENT_PRODUCT(state, data) {
    state.currentProduct = data
  },

  SET_CURRENT_PRODUCT_SAME_ITEMS(state, data) {
    state.additionalProducts.currentProductSameItems = data
  },

  SET_CURRENT_PRODUCT_BUYED_ITEMS(state, data) {
    state.additionalProducts.currentProductBuyedItems = data
    
  },

  SET_SORT(state, data) {
    state.sort = data
  },

  SET_LIMIT(state, data) {
    state.limit = data
  },

  SET_CATALOG_CONFIG(state, data) {
    state.catalogConfig = data
  },

  SET_PAGE_NUMBER(state, data) {
    state.pageNumber = data
  },

  ADD_WATCHED_ITEM(state, payload) {
    const { watchedItems } = state
    const { product, region } = payload

    const itemIndex = watchedItems.findIndex(p => p.article === product.article && p.region === region)

    if (itemIndex !== -1) {
      watchedItems.splice(itemIndex, 1)
    }
    watchedItems.unshift(product)
    // state.watchedItems = watchedItemsCopy

    // console.log(22, watchedItems)
    // console.log(44, watchedItemsCopy)

    // if(itemIndex !== -1) watchedItems.splice(idx, 1)
    // if(watchedItems.length > 5) watchedItems.splice(watchedItems.length - 1, 1)
    // watchedItems.unshift(product)
    window.localStorage.setItem('watchedItems', JSON.stringify(watchedItems))
  },

  SET_WATCHED_ITEMS(state, payload) {
    state.watchedItems = payload
  },

  RESET_DATA(state, payload) {
    state.pageNumber = 1
    state.limit = "15"
    state.sort = "price-down"
    state.tmpFiltersQuery = ""
  }
}
