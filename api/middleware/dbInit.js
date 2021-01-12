const DBManager = require("../database")

module.exports = async (req, res, next) => {
  req.db = DBManager

  next()
}