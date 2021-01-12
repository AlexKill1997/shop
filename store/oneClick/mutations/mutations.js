export default {
    SET_ORDER_DATA(state, payload) {
        state.orderClickItem = payload
    },

    SET_ORDER_COMPLETE(state, payload) {
        state.orderComplete = payload
    },

    RESET_DATA_ORDER(state) {
        state.orderClickItem = {}
    }
}