const productsSchema = require('./schemas/products')
const categorySchema = require('./schemas/categories')
const regionSchema = require('./schemas/regions')
const brandsSchema = require('./schemas/brands')
const clientsSchema = require('./schemas/clients')
const orderSchema = require('./schemas/orders')
const statusSchema = require('./schemas/status')
const conditionsSchema = require('./schemas/orders-status');
const callbacksSchema = require('./schemas/createCall');
const usersSchema = require('./schemas/users')

const popularSchema = productsSchema
const salesSchema = productsSchema

module.exports = {
  categorySchema,
  regionSchema,
  popularSchema,
  salesSchema,
  productsSchema,
  brandsSchema,
  clientsSchema,
  orderSchema,
  statusSchema,
  conditionsSchema,
  callbacksSchema,
  usersSchema
}
