const getProductById = async (req, res) => {
  const { id } = req.params
  const { region } = req.cookies

  const productModel = new (req.db.getModel("products"))
  const product = await productModel.getProductById(id, region)

  res.send(product)
}

module.exports = {
  getProductById
}