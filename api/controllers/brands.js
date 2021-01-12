const getBrandsProducts = async (req, res) => {
  const { query } = req
  req.query.filters = req.db.filtersQueryBuilder(query)
  const { brand } = req.params
  const { region } = req.cookies
  const bandsModel = new (req.db.getModel("brands"))
  const brandResult = await bandsModel.getBrands(brand, query, region)
  if (brandResult) {
    res.send(brandResult)
  }
  else res.send({ status: false }).status(404)
}

const countBrands = async (req, res) => {
  const { region } = req.cookies
  const brandsModel = req.db.getModel("brands")
  const brandsModelPrototype = new brandsModel

  const count = await brandsModelPrototype.countBrands(region)

  res.send({ count }).status(200)
}

const getPartsOfBrandsList = async (req, res) => {
  const { skip } = req.query
  const { region } = req.cookies
  const brandsModel = req.db.getModel("brands")
  const brandsModelPrototype = new brandsModel

  const brands = await brandsModelPrototype.getPartsFromBrandsList(region, skip)

  res.send({ brands }).status(200)
}

module.exports = {
  getBrandsProducts,
  countBrands,
  getPartsOfBrandsList
}