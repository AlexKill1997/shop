export default {
    DELETE_USER(state) {
        // state.userData.userName = ''
        // state.userData.userLastName = ''
        state.userData.userPhone = ''
    },
    
    DELETE_RECOVER(state) {
        // state.userData.userName = ''
        // state.userData.userLastName = ''
        state.userData.recoverUser = ''
    },

    SET_USER(state, payload) {
        for (let key in payload) {
            state.userData[key] = payload[key]
        }
    },

    SET_RECOVER(state, payload) {
        for (let key in payload) {
            state.userData[key] = payload[key]
        }
    },

    SET_AUTH_POPUP(state, payload) {
        state.authPopup = payload
    }
}