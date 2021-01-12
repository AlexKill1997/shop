const mailService = require("../services/nodemailer");

const freeCall = async (req, res) => {
  const { region: regionSlug } = req.cookies
  const { client, formType } = req.body.data
  console.log(req.body.data)
  console.log('Заказ с ', formType);
  const regionsModel = req.db.getModel("regions")
  const regionsModelPrototype = new regionsModel()
  const region = await regionsModelPrototype.getRegion(regionSlug)

  const manageModel = req.db.getModel("callbacks")
  const manageModelPrototype = new manageModel()
  const callClient = await manageModelPrototype.createManageUser(client, regionSlug, formType)

  // const mail = await mailService({
  //   to: region.email,
  //   subject: 'Заявка на обратный звонок с шапки',
  //   text: `Имя: ${client.name}\n\nТелефон: ${client.phone}`
  // })

  res.send({ type: 'success', data: { client } }).status(200)
  console.log('Заказ обратного звонка с header, на почту zakaz@tdcsk.com: ', client)
}

const callback = async (req, res) => {
  const { region: regionSlug } = req.cookies
  const { user, formType } = req.body.data

  const regionsModel = req.db.getModel("regions")
  const regionsModelPrototype = new regionsModel()
  const region = await regionsModelPrototype.getRegion(regionSlug)

  const manageModel = req.db.getModel("callbacks")
  const manageModelPrototype = new manageModel()
  const callClient = await manageModelPrototype.createManageUser(user, regionSlug, formType)

  // const mail = await mailService({
  //   to: region.email,
  //   subject: 'Заявка на обратный звонок с подвала',
  //   text: `Имя: ${user.name}\n\nТелефон: ${user.phone}`
  // })

  res.send({ type: 'success', data: { user } }).status(200)
  console.log('Заказ обратного звонка c footer, на почту zakaz@tdcsk.com: ', user)
}


const calculate = async (req, res) => {
  const { region: regionSlug } = req.cookies
  const paymentClient = JSON.parse(req.body.paymentClient)
  console.log(paymentClient)

  const regionsModel = req.db.getModel("regions")
  const regionsModelPrototype = new regionsModel()
  const region = await regionsModelPrototype.getRegion(regionSlug)

  const manageModel = req.db.getModel("callbacks")
  const manageModelPrototype = new manageModel().createManageUser(paymentClient, regionSlug)
  // const sendCalculate = await manageModelPrototype.createManageUser()


  // const mail = await mailService({
  //   subject: 'Заявка на расчёт',
  //   text: `Имя: ${paymentClient.name}\n\nТелефон: ${paymentClient.phone}\n\nКомпания: ${paymentClient.company}\n\nИНН: ${paymentClient.inn}\n\nКомментарий: ${paymentClient.comment}`,
  //   attachments: req.files.map(file => ({
  //     filename: file.originalname,
  //     content: file.buffer
  //   }))
  // })
  console.log('Отправка письма на почту: zakaz@tdcsk.com', paymentClient, req.files)

  res.sendStatus(200)
}
module.exports = {
  freeCall,
  callback,
  calculate
}