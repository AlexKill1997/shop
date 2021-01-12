import { v4 as uuid } from "uuid"

export default {
    SET_USER(state, payload) {
        state.user = payload
    },
    SET_USER_VERIFIED(state, payload) {
        state.verified = payload
    },
    UPDATE_USER_FIELD(state, { key, value }) {
        state.user[key] = value
    }
}