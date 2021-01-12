const updateUserService = require('../services/update-user-service')

const updateClient = async (req, res) => {
  const { data } = req.body
  const userModel = req.db.getModel("clients")

  try {
    const updatedClient = await updateUserService(data)
    if (updatedClient) {
      res.send({ status: true, message: 'Ok' })
    }
    else {
      res.send({ status: false, message: 'Update faled' })
    }
  }
  catch (e) {
    console.log(e)
  }
}

module.exports = {
  updateClient
}