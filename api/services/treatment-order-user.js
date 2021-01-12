const getUserData = require('../database/modules/getNewUserData');

module.exports = async (orderItem, cookies, order, userModel) => {
  const { token } = cookies
  const { phone } = orderItem
  let user, isNewUser = false, userPassword;

  if (token) {
    const tokenClient = await userModel.findOne({ token })
    if (tokenClient) user = tokenClient
  }
  if (!user) {
    const phoneUser = await userModel.findOne({ phone })
    if (phoneUser) {
      user = phoneUser
    }
    else {
      const { client: newClient, password } = await new userModel().addClient(phone)
      console.log(`зарегистрирован новый клиент: ${newClient.phone}, ${password}`);
      user = newClient
      userPassword = password
      isNewUser = true
    }
  }

  const newUserData = getUserData(user, orderItem)

  const updatedUser = await userModel.findByIdAndUpdate({ _id: user._id }, { ...newUserData }, { new: true })
  const lUser = await new userModel().getClientByToken(updatedUser.token)

  return {
    originalUser: updatedUser,
    user: lUser,
    password: userPassword,
    isNewUser
  }
}