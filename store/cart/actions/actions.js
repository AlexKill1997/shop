export default {
    // добавление в корзину 
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item)
    },

    // удаляет товар из корзины
    removeItem({ commit }, id) {
      commit('REMOVE_ITEM', id)
    },
    // Очищение корзины
    clearCart({ commit }) {
        commit('CLEAR_CART')
    },
}