const oneClickOrder = async (req, res) => {
  const orderModel = req.db.getModel("order")
  const { item } = req.body.data

  const orderHandler = await new orderModel().createOrder(item, req.cookies, "Заказ в один клик")

  if (orderHandler) {
    const { order, products, user } = orderHandler
    res.send({ status: true, ...products, orderNumber: order.number, text: "Спасибо за заказ" }).status(200)
  }
  else {
    res.send({ status: false })
  }
}

const createOrder = async (req, res) => {
  const { buyer: item } = req.body.data
  const orderModel = req.db.getModel("order")

  const orderHandler = await new orderModel().createOrder(item, req.cookies, "Заказ")

  if (orderHandler) {
    const { order, products, orderFile, user, token } = orderHandler

    res.cookie('token', token)
    res.send({ status: true, ...products, user, orderNumber: order.number, orderFile, text: "Спасибо за заказ" })
    
    console.log('Отправка письма на почту: zakaz@tdcsk.com и для записи в бд', order, orderFile)
  }
  else {
    res.send({ status: false })
  }
}

const getOrders = async (req, res) => {
  const { token, region } = req.cookies
  const { page } = req.query
  
  try {
    const orderModel = req.db.getModel('order')
    const orderModelPrototype = new orderModel

    const { orders, count, amount } = await orderModelPrototype.getUserOrders(token, region, page)
    if (orders) {
      res.send({ orders, count, amount })
    }
    else res.sendStatus(200)
  }
  catch (e) {
    console.log(e)
  }

}

const managerVerify = async (req, res) => {
  const { region } = req.cookies
  const { id: managerCode } = req.params
  const result = {}
  try {
    const manageModel = req.db.getModel('users')
    const manager = await manageModel.getManager( managerCode, region )
    if (manager) {
      result.status = true
      result.manager = manager
    } else {
      result.status = false
      result.error = 'Менеджер не найден'
    }
    res.send(result)
    res.status(200)

  } catch ( e ) {
    console.log(e)
  }

}

module.exports = {
  createOrder,
  getOrders,
  oneClickOrder,
  managerVerify
}