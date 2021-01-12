const axios = require('axios')
// const { axios: axiosConfig } = require("@/nuxt.config");
axios.defaults.withCredentials = true

module.exports = axios.create({
  baseURL: process.env.AXIOS_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHTTPRequest'
  }
})