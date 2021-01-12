const getMenuUrls = require("../database/modules/getMenuUrls")

const getRegionRoutes = async (req, res) => {
  const categoryModel = new (req.db.getModel("categories"))

  const { slug } = req.params
  const menu = await categoryModel.getCategories(slug)

  getMenuUrls(menu)

  // res.cookie("region", slug)
  res.send({ routes: menu }).status(200)
}

const getProductsCategory = async (req, res) => {
  const { query } = req
  const { region } = req.cookies
  req.query.filters = req.db.filtersQueryBuilder(query)

  const { cat, subcat, grandcat } = req.params
  const categoryModel = new (req.db.getModel("categories"))
  console.log(`Товары до: ${new Date().getSeconds()}`)
  const category = await categoryModel.getCategory(cat, subcat, query, region)
  console.log(`Товары после: ${new Date().getSeconds()}`)
  if (category) {
    res.send(category).status(200)
  }
  else res.send({ status: false }).status(404)
}

const getProductsSubcategory = async (req, res) => {
  const { query } = req
  const { region } = req.cookies
  req.query.filters = req.db.filtersQueryBuilder(query)

  const { subcat, cat, grandcat } = req.params
  const categoryModel = new (req.db.getModel("categories"))
  const subcategory = await categoryModel.getSubcategory(cat, subcat, grandcat, query, region)
  if (subcategory) {
    res.send(subcategory)
  }
  else res.send({ status: false }).status(404)
}

const countCategoryProducts = async (req, res) => {
  const { region } = req.cookies
  const { category, subcategory, grandcategory } = req.params

  const categoryModel = req.db.getModel("categories")
  const categoryModelPrototype = new categoryModel

  const count = await categoryModelPrototype.countCategoryProducts({ category, subcategory, grandcategory }, region)

  res.send({ count }).status(200)
}

const getViewsCountCategory = async (res, req) => {
  const { region } = req.cookies
  const { category, subcategory, grandcategory } = req.params

  const categoryModel = req.db.getModel('categories')
  const categoryModelPrototype = new categoryModel

  const viewscategories = await categoryModelPrototype.getViewsCount({ category, subcategory, grandcategory }, region)
  res.send( { viewscategories }).status(200)

}

module.exports = {
  getProductsCategory,
  getProductsSubcategory,
  getRegionRoutes,
  countCategoryProducts,
  getViewsCountCategory
}