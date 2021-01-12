const { Schema, Aggregate } = require('mongoose')
const axios = require('axios')
const treatmentOrderUserService = require('../../services/treatment-order-user');
const generator = require('generate-password')
const { SMSRu } = require('node-sms-ru')
const mailService = require("../../services/nodemailer")

const mongoose = require('mongoose')

const { ORDERS_FORMAT, ORDER_PRODUCT_FORMAT, STATUS_FORMAT, MANAGER_FORMAT } = require('../aggregation/helpers/resonse-formats')
const { getRegionItem, getItemByRegionID, getLastItem } = require('../aggregation/helpers/helper');
const DATABASE_CONSTANTS = require('../../config/database_constants');
const { pipeline } = require('form-data');
const { getSixNumberString } = require('../../helpers/numbers');

const smsRu = new SMSRu(process.env.SMSRUKEY)

const orderSchema = new Schema(
  {
    number: { type: Number, required: true },
    created: { type: Date, required: true, default: new Date() },
    buyed: { type: Date, required: true, default: new Date() },
    region: { type: Schema.Types.ObjectId, required: true, ref: 'Regions' },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Status'
    },
    client: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Clients'
    },
    products: [
      {
        _id: false,
        quantity: {
          type: Number,
          required: true
        },
        cost: {
          type: Number,
          required: true,
        },
        club_cost: {
          type: Number,
          required: false,
          default: null
        },
        discount_price: {
          type: Number,
          required: false,
          default: null
        },
        product_id: {
          ref: 'Products',
          type: Schema.Types.ObjectId
        }
      }
    ],
    sum: { type: Number, required: true, default: null },
    // discount_sum: { type: Number, required: false, default: null },
    deliver: { type: Date, required: false, default: '' },
    comment: { type: String, required: false, default: '' },
    payment: { type: String, required: false, default: '' },
    manager: { type: Schema.Types.ObjectId, required: false, ref:"Manager", default: null},
    delivery: {
      type: {
        city: {
          type: String,
          required: true
        },
        street: {
          type: String,
          required: true
        },
        house: {
          type: String,
          required: true
        },
        building: {
          type: String,
          required: true
        },
        appt: {
          type: String,
          required: true
        },
      },
      required: false
    }
  },
  { timestamps: true }
)

orderSchema.statics.getNewNumber = async function () {
  const orderModel = mongoose.model("orderModel")

  const lastOrder = await orderModel
    .aggregate()
    .append(getLastItem())
    .toObject()
  
  if (!lastOrder) return "000001"
  
  // const newNumber = getSixNumberString(+lastOrder.number + 1)
  const newNumber = lastOrder.number + 1

  return newNumber
}

orderSchema.methods.getUserOrders = async function (token, regionSlug, page = 1) {
  const clientsModel = this.model("clientsModel")
  const orderModel = this.model("orderModel")
  const regionsModel = this.model("regionsModel")
  const productsModel = this.model("productsModel")

  const PAGE = +page - 1

  const region = await new regionsModel().getRegion(regionSlug)

  try {
    const user = await clientsModel.findOne({ token })

    if (!user) return

    const ordersCountAggregate = await orderModel
      .aggregate()
      .match({
        client: user._id
      })
      .group({
        _id: null,
        count: {
          $sum: 1
        }
      })
      .toObject()

    const totalSumAggregate = await orderModel
      .aggregate()
      .match({
        client: user._id
      })
      .group({
        _id: null,
        sum: {
          $sum: "$sum"
        }
      })
      .toObject()
    
    const ordersCount = ordersCountAggregate ? ordersCountAggregate.count : 0
    const ordersSum = totalSumAggregate ? totalSumAggregate.sum : 0

    const orders = await orderModel
      .aggregate()
      .match({ client: user._id })
      .skip(PAGE * DATABASE_CONSTANTS.ORDERS_LIMIT)
      .limit(DATABASE_CONSTANTS.ORDERS_LIMIT)
      .lookup({
        from: "regions",
        let: { region: "$region" },
        pipeline:
          new Aggregate()
            .match({
              $expr: {
                $eq: ["$$region", "$_id"],
              }
            })
            .pipeline(),
        as: "region"
      })
      .addFields({
        region: {
          $arrayElemAt: ["$region", 0]
        }
      })
      .lookup({
        from: "users",
        let: { manager_id: "$manager", region_id: "$region" },
        pipeline: [
          ...new Aggregate()
            .match({
              role: "manager",
              $expr: {
                $eq: ["$_id", "$$manager_id"],
                $eq: ["$region", "$$region_id"],
              }
            })
            .project(MANAGER_FORMAT)
            .pipeline()
        ],
        as: "manager"
      })
      .addFields({
        manager: {
          $cond: ["$manager", { $arrayElemAt: ["$manager", 0]}, null]
        }
      })
      // .lookup({
        // from: "products",
        // let: { products: "$products" },
        // pipeline: [
        //   ...new Aggregate()
            // .append(getRegionItem(region, 'product'))
            // .match({
            //   $expr: {
            //     $in: ["$_id", "$$products.product_id"]
            //   }
            // })
            // .addFields({
            //   product: {
            //     $filter: {
            //       input: "$$products",
            //       as: "product",
            //       cond: {
            //         $eq: ["$_id", "$$product.product_id"]
            //       }
            //     }
            //   }
            // })
            // .append({
            //   $set: {
            //     product: {
            //       $arrayElemAt: ["$product", 0]
            //     }
            //   }
            // })
            // .append({
            //   $set: {
            //     cost: "$product.cost",
            //     club_cost: "$product.club_cost",
            //     discount_price: "$product.discount_price",
            //     count: "$product.quantity"
            //   }
            // })
      //       .project(ORDER_PRODUCT_FORMAT)
      //       .pipeline()
      //   ],
      //   as: "products"
      // })
      .lookup({
        from: "conditions",
        let: { status_id: "$status" },
        pipeline:
          new Aggregate()
            .match({
              $expr: {
                $eq: [ "$_id", "$$status_id"]
              }
            })
            .project(STATUS_FORMAT)
            .pipeline(),
        as: "status"
      })
      .addFields({
        status: {
          $arrayElemAt: ["$status", 0]
        }
      })
      .project(ORDERS_FORMAT)
    
    for (let order of orders) {
      let i = 0;
      for (let product of order.products) {
        const DBProduct = await productsModel
          .aggregate()
          .match({
            "regions.product._id": product.product_id
          })
          .append(getItemByRegionID(order.region._id, "product"))
          .addFields({
            count: product.quantity
          })
          .project(ORDER_PRODUCT_FORMAT)
          .toObject()
        
        order.products[i] = Object(DBProduct, product)

        i++
      }
    }
    
    return {
      count: ordersCount,
      orders: orders,
      amount: ordersSum
    }
  }
  catch (e) {
    console.log(e)
  }
}

orderSchema.methods.createOrder = async function (item, cookies, orderType) {
  const { token, region } = cookies

  try {
    const order = {}
    const productsModel = this.model("productsModel")
    const regionModel = this.model("regionsModel")
    const conditionsModel = this.model("conditionsModel")
    const userModel = this.model("clientsModel")
    const orderModel = this.model("orderModel")
    const managerModel = this.model("usersModel")
  
    const productModelPrototype = new productsModel
  
    item.products = item.products.map(({ quantity, article }) => ({ quantity, article: +article }))
  
    const articlesArray = item.products.map(prod => prod.article)
    const products = await productModelPrototype.getProductsByArticle(articlesArray, region)
  
    let orderSum = {
      value: 0,
      discountValue: 0
    }
    order.products = products.map(product => {
      const orderProduct = item.products.find(prod => prod.article === product.article)
      orderSum.value += product.cost
      orderSum.discountValue += (product.discount_price || product.cost)
  
      return {
        product_id: product._id,
        quantity: orderProduct.quantity,
        cost: product.cost,
        club_cost: product.club_cost || null,
        discount_price: product.discount_price || null,
      }
    })
    const currentRegion = await new regionModel().getRegion(region)
  
    const status = await conditionsModel.findOne({ value: 'awaiting' })
    order.region = currentRegion._id
    order.status = status._id
    order.number = await orderModel.getNewNumber()
    order.comment = item.comment
    order.delivery = item.delivery
    order.payment = item.payment
    order.manager = await managerModel.getManager(item.manager, region)
    // order.sum = orderSum.value
    order.sum = orderSum.discountValue
  
    const newOrder = new orderModel(order)
    const { user, password, isNewUser, originalUser } = await treatmentOrderUserService(item, cookies, newOrder, userModel)
    
    newOrder.client = originalUser._id
  
    console.log(originalUser.orders)
    
    await newOrder.save()

    // const newUserOrders = originalUser.orders ? originalUser.orders.concat([newOrder._id]) : [newOrder._id]
    
    const updatedUser = await userModel.findByIdAndUpdate({ _id: originalUser._id }, { $push: { orders: newOrder._id } }, { new: true })
    
    console.log(updatedUser.orders)
  
    const orderNumber = order.number
    
    let getLink = 'https://цск.com/documents/get'
    let orderID = newOrder._id
    let link 
    await axios.post(getLink, {orderId: orderID})
      .then(async res => {
        let result = res.data
        console.log(result)
        link = result.link
      })
      .catch(error => {
        return error
      })
    
    const message = isNewUser ?
      `Ваш заказ на сайте tdcsk.com был успешно оформлен.\nВаш логин: ${user.phone}\nВаш пароль: ${password}\nНомер заказа: ${orderNumber}` :
      `Ваш заказ на сайте tdcsk.com был успешно оформлен.\nНомер заказа: ${orderNumber}`
  
    let productsString = ``
    let productsPrice = 0
  
    products.forEach(prod => {
      const productCount = item.products.find(product => product.article === prod.article).quantity
      productsString += `Наименование товара: ${prod.title}\nАртикул: ${prod.article}\nВ количестве: ${productCount}\n\n`
      productsPrice += productCount * (prod.discount ? prod.discount_price : prod.cost)
    })
  
    // const sendResult = await smsRu.sendSms({
    //   to: user.phone,
    //   from: 'tdcsk.com',
    //   msg: message
    // })
  
    // const mail = await mailService({
    //   to: currentRegion.email,
    //   subject: orderType,
    //   text: `Регион: ${currentRegion.title}\n\nИмя: ${user.name}\n\nТелефон: ${user.phone}\n\nКомментарий: ${order.comment}\nномер заказа: ${orderNumber}\n\nПозиция товаров: ${products.length}`
    // })
    console.log('Клиент оформил заказ: ', user)
    console.log(`Имя: ${user.name}\n\nТелефон: ${user.phone}\n\nКомментарий: ${order.comment}\n\nномер заказа: ${orderNumber}\n\nПозиция товаров: ${products.length}`)
  
    return {
      order: newOrder,
      orderFile: link,
      products: {
        price: productsPrice,
        count: products.length
      },
      user,
      token: originalUser.token
    }
  }
  catch (e) {
    return false
  }
}

module.exports = orderSchema