export default {
  SET_ORDERS(state, payload) {
    state.orders = payload
  },
  SET_CURRENT_ORDER_INDEX(state, index) {
    state.currentOrderIndex = index
  },
  SET_ORDERS_COUNT(state, payload) {
    state.ordersCount = payload
  },
  SET_PAGE_NUMBER(state, data) {
    state.pageNumber = data
  },
  SET_AMOUNT(state, payload) {
    state.amount = payload
  }
}