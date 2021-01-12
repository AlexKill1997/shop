const DB_CONSTANTS = require('../config/database_constants')
const getLocation = require('../services/getLocation')

module.exports = async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  if (!req.query) req.query = {}
  if (!req.params) req.params = {}
  if (req.xhr) return next()
  if(req.query.skipReq) return next()

  const regionsModel = req.db.getModel("regions")
  const regionsModelPrototype = new regionsModel()
  const regionSlug = req.query.region || req.params.region


  if (regionSlug) {
    if (regionSlug === req.cookies.region) return next()
    const _region = await regionsModelPrototype.getRegion(regionSlug)
    if (_region) req.cookies.region = regionSlug
  }
  else if (req.cookies.region) return next()
  else {
    const regionISO = await getLocation(ip)

    if (regionISO) {
      console.log(`Region ISO: ${regionISO}`)
      const region = await regionsModelPrototype.getRegionByISO(regionISO)
      
      if (region) req.cookies.region = region.value
      else req.cookies.region = DB_CONSTANTS.DEFAULT_REGION
    }
    else req.cookies.region = DB_CONSTANTS.DEFAULT_REGION 
  }

  res.cookie("region", req.cookies.region)
  
  next()
}