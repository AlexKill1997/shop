module.exports = async function (req, res, next) {
  const { token } = req.cookies
  if (token) {
    try {
      const clientsModel = req.db.getModel("clients")
      const user = await new clientsModel().getClientByToken(token)
      req.user = user
      req.isAuth = true
      next()
    }
    catch (e) {
      next()
    }
  }
  else next()
}