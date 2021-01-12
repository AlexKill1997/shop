const axios = require("./axios")

const backendRecaptchaCheck = async (token) => {
  const { data } = await axios.post("/api/services/recaptcha", {
    data: {
      token
    }
  })
  
  if (data.status) {
    return true
  }
  else return false
}

export {
  backendRecaptchaCheck
}