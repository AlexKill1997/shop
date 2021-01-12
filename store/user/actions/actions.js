import axios from '~/services/axios'

export default {
  async getUser({ commit }, $axios) {
    const { data: user } = await $axios.get('/api/auth/sign')

    commit("SET_USER", user)
    commit("SET_USER_VERIFIED", true)
  },

  async updateUserRequest({ state }, changeData) {
    // старый сравнивать с базой
    console.log('Данные после обновления в лк', changeData)
    
    const { data } = await axios.post('/api/clients/update', {
      data: changeData
    })

    const { status } = data

    if (status) {
      console.log(data.message)
      return status
    }
    else {
      console.log(data.error)
      return status
    }
  }
}