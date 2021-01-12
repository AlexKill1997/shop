export default {
    SET_CALLBACK_DATA(state, payload) {
        state.callback.footer.callbackData = payload
    },

    SET_CALLBACK_COMPLETE(state, payload) {
        state.callback.footer.callbackComplete = payload
    },

    RESET_CALLBACK_DATA(state) {
        state.callback.footer.callbackData = {}
    },

    RESET_HEADER_CALLBACK_DATA(state) {
        state.callback.header.headercallbackComplete = {}
    },
    SET_HEADER_CALLBACK_COMPLETE(state, payload) {
        state.callback.header.headercallbackComplete = payload
    },

    SET_HEADER_CALLBACK_DATA(state, payload) {
        state.callback.header.headercallback = payload
    },

    SET_HEADER_CALCULATION(state, payload) {
        state.calculation.headercalculation = payload
    },

    SET_HEADER_CALCULATION_COMPLETE(state, payload) {
        state.calculation.headercalculationComplete = payload
    },
    RESET_HEADER_CALCULATION_COMPLETE(state) {
        state.calculation.headercalculationComplete = {}
    }
}