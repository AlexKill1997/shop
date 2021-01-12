const express = require('express');
const consola = require('consola');
require("dotenv").config();
const { Nuxt, Builder } = require('nuxt');
const app = express();
const cors = require('cors');
const { connect } = require("../api/database")
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const cachePlugin = require("../api/database/plugins/cache");
const basePlugin = require("../api/database/plugins/base");
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: [
    'https://xn--j1ano.com',
  ],
  // allowedHeaders: {
  //   'Access-Control-Allow-Credentials': true
  // },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.use(cookieParser())

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // app.use(api.path, api.handler)
  basePlugin()
  cachePlugin()
  connect()

  // Give nuxt middleware to express
  app.use(nuxt.render)

  app.listen(port, host)
  app.set('trust proxy', true)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
 