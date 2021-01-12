const { generatePassword } = require("../utils/bcrypt");
const generator = require('generate-password')
const { SMSRu } = require('node-sms-ru')
const smsRu = new SMSRu(process.env.SMSRUKEY)
const mailService = require("../services/nodemailer");

const register = async (req, res) => {
  const { user } = req.body.data
  const { phone } = user
  const clientsModel = new (req.db.getModel("clients"))

  try {
    const isExisted = await clientsModel.isExistedUser(phone)
    if (isExisted) return res.send({ error: "Пользователь уже зарегистрирован" })
    const { region: regionSlug } = req.cookies
    const { client: newClient, password, token } = await clientsModel.addClient(phone, regionSlug)
    console.log('Пользователь: ', newClient, password)
    console.log('Пользователь зарегистрирован')
    // Send mail
    // const sendResult = await smsRu.sendSms({
    //   to: newClient.phone,
    //   from: 'tdcsk.com',
    //   msg: `Логин: ${newClient.phone}\nпароль: ${password}\nОнлайн гипермаркет tdcsk.com`,
    //   // ... описание всех опций можно найти в документации
    // })
    // if (sendResult) console.log("СМС Отправлен", sendResult)
    // else console.log("Отправка СМС не удалась")

    res.cookie("token", token)
    res.send({ type: 'success', data: { user: newClient } }).status(200)
  }
  catch (e) {
    console.log(e)
  }
}

const login = async (req, res) => {
  const { phone, password } = req.body.data
  console.log(phone, password)
  const clientsModel = req.db.getModel("clients")
  const { user, token } = await new clientsModel().getClient({ phone, password })

  if (user) {
    res.cookie("token", token)
    res.send({ type: "success", data: { user } })
  }
  else res.send({ type: 'error', error: { text: "Неверный логин или пароль" } })
}

const recoverPassword = async (req, res) => {
  const { phone } = req.body.data

  const clientsModel = req.db.getModel("clients")

  try {
    const pass = generator.generate({
      length: 8,
      numbers: true,
      symbols: false
    })

    const password = await generatePassword(pass)

    console.log(pass, password)

    const result = await new clientsModel().resetPassword({ phone, password })

    // if (result) {
    //   const sendResult = await smsRu.sendSms({
    //     to: phone,
    //     from: 'tdcsk.com',
    //     msg: `Ваш новый пароль на сайте tdcsk.com - ${pass}`,
    //     // ... описание всех опций можно найти в документации
    //   })
    //   if (sendResult) console.log("СМС Отправлен", sendResult)
    //   else console.log("Отправка СМС не удалась")

    //   res.send({ type: "success", data: { text: "Пароль успешно изменен" } })
    // }
    // else {
    //   res.send({ type: "error", error: { text: "Что-то пошло не так" } })
    // }
  }
  catch (e) {
    console.log(e)
  }
}

const sign = async (req, res) => {
  const user = req.user || null
  res.send(user).status(200)
}

const logout = async (req, res) => {
  req.cookies.token = null
  req.user = null
  res.cookie("token", "", { maxAge: 0 })
  res.send({ type: "success" })
}

module.exports = {
  login,
  register,
  sign,
  recoverPassword,
  logout
}