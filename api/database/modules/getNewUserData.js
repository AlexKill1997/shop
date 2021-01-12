const excludedFields = ['agree', 'news', 'products', 'oldPassword', 'newPassword', 'confirm', 'card']

function getUserData(user, orderData) {
  const newUserData = {}

  for (let key in orderData) {
    if(!user[key] && !excludedFields.includes(key)) newUserData[key] = orderData[key]
  }

  return newUserData
}

module.exports = getUserData