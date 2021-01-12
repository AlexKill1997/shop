const geoIP = require('geoip-lite')

module.exports = async (ip) => {
  try {
    const searchClient = geoIP.lookup(ip)
    if (searchClient) {
      return searchClient.region
    }
    else return false
    // res.send({ status: true, userlocation: ip, region: searchClient.region, city: searchClient.city}).status(200)
  } catch (e) {
    // res.send({ip: req.ip, error: e.message})
  }
}