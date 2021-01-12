const mongoose = require('mongoose');
const mongoConfig = require('./mongoConfig');

// require("./plugins/base");

function mongooseInit(callback) {
  mongoose.connect(`mongodb+srv://${mongoConfig.admin}:${mongoConfig.mongoPass}@cluster0.8xq5y.mongodb.net/${mongoConfig.mongodbName}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true },
  async err => {
    if (err) console.log(err)
    console.log('connect to DB successfull');
    if (callback) callback()
  })
}

module.exports = mongooseInit