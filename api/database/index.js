const { requireUncached } = require("../utils")
const mongooseInit = require('./mongoose')
const { model } = require("mongoose")
const mongoose = require("mongoose")
const path = require("path")
const queryParams = require("./modules/queryParams")

const schemas = () => requireUncached(path.resolve(__dirname, "schemas"))

class Database {

  constructor() {
    this.models = []
    this.schemas = Database.schemas
    this.installed = false
  }

  initPlugins() {
    if (this.installed) return
  }

  static addSchema(key, schema, collection) {
    Database.schemas.push({
      name: key,
      instance: schema,
      collection
    })
  }

  _initModels() {
    this.schemas.forEach(schema => {
      const modelName = schema.name.replace("Schema", "Model")
      const tmpModel = mongoose.models[schema.name.replace("Schema", "Model")]
      if (tmpModel) delete mongoose.models[modelName]
      const newModel = model(`${modelName}`, schema.instance, schema.collection || schema.name.replace("Schema", ''))
      this.models.push({
        name: modelName,
        instance: newModel
      })
    })
  }

  getModel(modelKey) {
    const modelName = modelKey += "Model"
    const model = this.models.find(model => model.name === modelName)
    if (model) return model.instance
    else throw new Error("Model not found")
  }

  install() {
    this._initModels()
    this.initPlugins()
  }
}

Database.schemas = []

Database.addSchema("categoriesSchema", schemas().categorySchema, 'categories')
Database.addSchema("regionsSchema", schemas().regionSchema)
Database.addSchema("popularSchema", schemas().popularSchema)
Database.addSchema("salesSchema", schemas().salesSchema)
Database.addSchema("productsSchema", schemas().productsSchema)
Database.addSchema("brandsSchema", schemas().brandsSchema)
Database.addSchema("clientsSchema", schemas().clientsSchema)
Database.addSchema("orderSchema", schemas().orderSchema, 'orders')
Database.addSchema("statusSchema", schemas().statusSchema)
Database.addSchema("conditionsSchema", schemas().conditionsSchema)
Database.addSchema("callbacksSchema", schemas().callbacksSchema)
Database.addSchema("usersSchema", schemas().usersSchema)

const db = new Database()

class DBManager {
  static create() {
    db.install()
  }
  static getModel(model) {
    return db.getModel(model)
  }

  static filtersQueryBuilder(query) {
    return queryParams(query)
  }
}

module.exports = DBManager
module.exports.connect = mongooseInit