const searchByArticle = async (req, res) => {
  const { article } = req.body.data

  const { region } = req.cookies

  const productModel = new (req.db.getModel("products"))
  const products = await productModel.searchByArticle(article, region)

  res.send(products).status(200)
}

const search = async (req, res) => {
  const { search } = req.body.data
  const { region } = req.cookies

  const data = {}

  const productModel = new (req.db.getModel("products"))
  const categoriesModel = new (req.db.getModel("categories"))
  data.categories = await categoriesModel.searchCategory(search, region)
  data.products = await productModel.searchProduct(search, region)
  // const products = await productModel.searchByArticle(article)

  res.send(data).status(200)
}

module.exports = {
  search,
  searchByArticle
}