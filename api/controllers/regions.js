const DB_CONSTANTS = require('../config/database_constants')

const setRegion = async (req, res) => {
  const { region: regionSlug } = req.params || req.cookies

  console.log(regionSlug)

  const regionModel = req.db.getModel("regions")
  const regionModelPrototype = new regionModel()
  const region = await regionModelPrototype.getRegion(regionSlug)
  const regionValue = region ? region.value : DB_CONSTANTS.DEFAULT_REGION

  console.log(req.url, region)
  res.cookie("region", regionValue)
  res.send({ region, regionCookie: regionValue }).status(200)
}

module.exports = {
  setRegion
}