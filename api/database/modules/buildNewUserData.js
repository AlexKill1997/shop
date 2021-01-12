const excludedFields = ['_id', 'password', 'confirm', 'newPassword', 'oldPassword']

function buildNewUserData(user, data) {
  const newData = {}

  for (let key in data) {
    if(excludedFields.includes(key)) continue
    if(user[key] !== data[key]) newData[key] = data[key]
  }

  return newData
}

module.exports = buildNewUserData