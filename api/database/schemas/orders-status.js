const { Schema } = require('mongoose')

const conditionsSchema = new Schema(
  {
    title: { type: String, required: true },
    value: { type: String, required: true }
  }
)

module.exports = conditionsSchema