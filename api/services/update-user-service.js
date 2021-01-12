const { model } = require("mongoose")
const { comparePasswords, generatePassword } = require("../utils/bcrypt")
const getUserData = require("../database/modules/getNewUserData")
const buildNewUserData = require("../database/modules/buildNewUserData")
const { updateClient } = require("../controllers/clients")

const compare = async ({ dbPassword, password, newPassword }) => {
  const response = {}

  if (!password) {
    response.code = "MissedPass"
    response.status = false
    return response
  }

  const isPasswordMatched = await comparePasswords(password, dbPassword)

  if (!isPasswordMatched) {
    response.code = "WrongPass"
    response.status = false
    return response
  }

  return { status: true }
}

const updatePassword = async (DBUser, user) => {
  const UserModel = model("clientsModel")

  // comparing password and update on db
  const isPasswordSucceed = await compare({ password: user.oldPassword, newPassword: user.newPassword, dbPassword: DBUser.password })

  if (isPasswordSucceed.status) {
    const cryptedPassword = generatePassword(user.newPassword)

    const updateStatus = await UserModel.findOneAndUpdate({ phone: user.phone }, { password: cryptedPassword })
    
    if (updateStatus) {
      console.log(`Password was updated. Old password: ${user.oldPassword}; New password: ${user.newPassword}, bcrypted: ${cryptedPassword}`)      
    }

    return { status: true }
  }
  else {
    switch (isPasswordSucceed.code) {
      case "MissedPass":
        // do something, exit from updater
      break
      case "wrongPass":
        // do something, exit from updater
      break
    }
    return isPasswordSucceed
  }
}

module.exports = async (user) => {
  console.log(user)
  const UserModel = model("clientsModel")
  
  try {
    const DBUser = await UserModel.findOne({ phone: user.phone })

    // exit from updater when no user was found
    if (!DBUser) return false
    else console.log(`User ${DBUser._id} was found`)
    // if newPassword was requested
    if (user.newPassword) {
      console.log(`Password update request`)
      const isPasswordUpdateSucceed = await updatePassword(DBUser, user)
      if (isPasswordUpdateSucceed.status) {
        //
      }
      else {
        console.log(`Failed with error: ${isPasswordUpdateSucceed.code}`)
        return false
      }
      
      for (let key in user) {
        if(key.includes("password")) delete user[key]
      }
    }
    
    // if (user.mail || user.birthday) {
    //   const isUserUpdate = await new UserModel().updateClient(DBUser, user)
    // }
    // else {
    //   console.log(`Failed with error: ${isUserUpdate}`)
    // }

    //if card was requested
    //...


    // simple user data update
    const newUserData = buildNewUserData(DBUser, user)

    if (Object.keys(newUserData).length > 0) {
      console.log(`User fields simple update request with:\n`, newUserData)
      const updatedUser = await UserModel.findByIdAndUpdate({ _id: DBUser._id }, newUserData, { new: true })
    }

    return true
  }
  catch (e) {
    console.log(e)
  }
}