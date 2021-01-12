const { Schema } = require('mongoose')

const { generatePassword, comparePasswords } = require('../../utils/bcrypt')
const { generateToken, generateRefreshToken } = require('../../utils/jwt')
const generator = require('generate-password')
const { SMSRu } = require('node-sms-ru')
const smsRu = new SMSRu(process.env.SMSRUKEY)

const { CLIENTS_FORMAT } = require('../aggregation/helpers/resonse-formats')

const clientsSchema = new Schema(
  {
    token: {
      type: String,
      required: false,
      default: null
    },
    refresh: {
      type: String,
      required: false,
      default: null
    },
    // Физическое лицо
    // ФИО
    surname: { type: String, required: false, default: '' },
    name: { type: String, required: false, default: '' },
    lastname: { type: String, required: false, default: '' },

    // Юридическое лицо
    bank: { type: String, required: false },
    organisation: { type: String, required: false },
    checking_account: { type: String, required: false },
    inn: { type: String, required: false },
    kpp: { type: String, required: false },
    okpo: { type: String, required: false },
    director: { type: String, required: false },
    ur_address: { type: String, required: false },
    account_number: { type: String, required: false },
    ownership: {type: String, required: false},
    ur_actualAddress: {type: String, required: false},
    ur_corScore: {type: String, required: false},
    bik: { type: String, required: false },

    // Общее
    // Личная информация
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: false, default: null },
    birthday: { type: Date, required: false, default: null },
    region: { type: Schema.Types.ObjectId, ref: 'Regions'},
    orders: [
      { type: Schema.Types.ObjectId, required: false, ref: 'Orders' }
    ],
  },
  { timestamps: true }
)


clientsSchema.methods.isExistedUser = async function (phone) {
  const clientsModel = this.model('clientsModel')

  const client = await clientsModel.findOne({ phone })

  return !!client
}

clientsSchema.methods.addClient = async function (phone, regionSlug) {
  const clientsModel = this.model('clientsModel')
  const regionModel = this.model('regionsModel')

  const region = await new regionModel().getRegion(regionSlug)

  const password = generator.generate({
    length: 8,
    numbers: true,
    symbols: false
  })

  let dataClient = {
    phone: phone,
    region: region._id
  }
  dataClient.password = await generatePassword(password)
  dataClient.token = generateToken({ login: phone, password })
  dataClient.refresh = generateRefreshToken({ login: phone, password })

  try {
    const newClient = new clientsModel(dataClient)
    await newClient.save()

    const currentClient = await clientsModel
      .aggregate()
      .match({ token: newClient.token })
      .project(CLIENTS_FORMAT)
      .toObject()
    return {
      client: currentClient,
      token: newClient.token,
      password
    }
  } catch (e) {
    console.log(e)
  }
}

clientsSchema.methods.getClientByToken = async function (token) {
  const clientsModel = this.model('clientsModel')

  try {
    const client = await clientsModel
      .aggregate()
      .match({ token })
      .project(CLIENTS_FORMAT)
      .toObject()

    return client

  } catch (e) {
    console.log(e)
  }
}

clientsSchema.methods.getClient = async function (userData) {
  const { phone, password } = userData

  const clientsModel = this.model('clientsModel')
  const clients = await clientsModel.find({}).lean()

  try {
    let user
    for(let client of clients) {
      if (await comparePasswords(password, client.password) && phone === client.phone)
        user = client
    }

    if (!user) return false

    const currentUser = await clientsModel
      .aggregate()
      .match({ token: user.token })
      .project(CLIENTS_FORMAT)
      .toObject()

    if (!currentUser) return false

    return {
      user: currentUser,
      token: user.token,
      password: user.password
    }

  } catch (e) {
    console.log(e)
  }
}

clientsSchema.methods.resetPassword = async function ({ phone, password }) {
  const clientsModel = this.model('clientsModel')

  try {
    const user = await clientsModel.findOne({ phone })
    if (!user) return false

    await clientsModel.updateOne({ phone }, { password })
    return true
  } catch (e) {
    console.log(e)
  }
}

clientsSchema.methods.updateClient = async function (clientData, token) {
  // сравнить старый пароль с паролем на базе и перезаписать пароль на базе - на новый пароль
  console.log('Данные клиента: ', clientData, token)
  const clientModel = this.model("clientsModel")
  const { password, phone } = clientData
  const client = await clientModel.findOne({phone: phone}).lean()
  const oldPassword = client.password
  const passwordCheck = await comparePasswords(client.password, password) && phone === client.phone
  try {
    if (passwordCheck) {
    const updatedClient = await clientModel.updateOne({ token }, oldPassword)
    res.send({ status: true, message: 'Ok' })
    return updatedClient
    }
    else {
      res.send({ status: false, message: 'Update faled' })
    }
  }

  catch (e) {
    console.log(e)
  }
}

module.exports = clientsSchema