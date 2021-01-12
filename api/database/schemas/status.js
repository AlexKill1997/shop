const { Schema } = require('mongoose')

const statusSchema = new Schema(
  {
    title: { type: String, required: true },
    value: { type: String, required: true }
  }
)

module.exports = statusSchema