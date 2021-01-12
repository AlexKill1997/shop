const { connect, getModel } = require("./index")
const DBManager = require("./index")
const { Schema, Types } = require("mongoose")

DBManager.create()

connect(async () => {
    
  let catModel = getModel('categories')
  let popularModel = getModel('popular')
  let salesModel = getModel('sales')
  salesModel.deleteMany()
  popularModel.deleteMany()
  let sales = await catModel
  
  .aggregate()
  .project({ product: "$category_id.products" })
  .unwind({ path: "$product" })
  .unwind({ path: "$product" })
  .skip(200)
  .limit(5)

  let resultSales = sales.map(sale => sale.product)

  let populars = await catModel
  .aggregate()
  .project({ product: "$category_id.products" })
  .unwind({ path: "$product" })
  .unwind({ path: "$product" })
  .skip(300)
  .limit(5)

  let resultPopular = populars.map(pop => pop.product)

  popularModel.create(resultPopular)
  salesModel.create(resultSales)
})

