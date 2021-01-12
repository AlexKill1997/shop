export default {
    SET_PAYMENT_DATA(state, payload) {
        state.userPaymentData = payload
    },

    SET_PAYMENT_COMPLETE(state, payload) {
        state.paymentComplete = payload
    },

    RESET_DATA_PAYMENT(state) {
        state.userPaymentData = {}
    }
}