const fs = require('fs');
const { resolve } = require('path');

const PATH = resolve(__dirname, "../../static/")
const HOST = 'https://tdcsk.com'

module.exports = {
  PATH,
  HOST
}