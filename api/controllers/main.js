const getMenuUrls = require("../database/modules/getMenuUrls")

const mainData = async (req, res) => {
  const { region: regionSlug } = req.cookies
  console.log('До', new Date().getSeconds())
  // const brandsModel = new (req.db.getModel("brands"))
  const regionsModel = req.db.getModel("regions")
  const categoriesModel = req.db.getModel("categories")
  // const productsModel = req.db.getModel("products")
  // const productsModelPrototype = new productsModel
  // const popularModel = req.db.getModel("popular")

  const menuRoutes = await categoriesModel.getAllCategories(regionSlug)
  // const popularItems = await popularModel.find({})
  // const salesItems = await productsModelPrototype.getSalesProducts(regionSlug)
  // const brands = await brandsModel.getBrandsList()
  const regions = await regionsModel.getRegions(regionSlug)
  console.log('После', new Date().getSeconds())

  getMenuUrls(menuRoutes, regionSlug)

  res.cookie('region', req.cookies.region)
  res.send({ salesItems: [], popularItems: [], brands: [], regions, menuRoutes }).status(200)
  /// TODO:
  // res.send({ salesItems: [], popularItems: [], brands: [], regions, phones: regions.current.phones, menuRoutes }).status(200)
}

module.exports = {
  mainData
}