const axios = require('axios')
const mongoose = require('mongoose')
const geoIP = require('geoip-lite')
const execSh = require("exec-sh")

const SITEMAP_CONFIG = require('../config/sitemap')

const sitemapService = require('../services/sitemap')

const recaptchaVerify = async (req, res) => {
  const { token } = req.body.data

  const { data } = await axios.get('https://www.google.com/recaptcha/api/siteverify', {
    params: {
      secret: process.env.RE_SECRET_KEY,
      response: token
    }
  })

  console.log(data)
  
  if (data.success && data.score > 0.5) {
    res.send({ status: true })
  }
  else {
    res.send({ status: false })
  }
}

const cacheClear = async (req, res) => {
  const { collection } = req.query
  const { models } = mongoose

  if (collection) {
    switch (collection.constructor) {
      case Array:
        const modelsArray = []

        for (let key in models) {
          const model = models[key]
          if (collection.includes(model.collection.collectionName)) modelsArray.push(model)
        }

        modelsArray.forEach(model => model.cacheClear())
        break;
      
      case String:
        for (let key in models) {
          if (models[key].collection.collectionName === collection) models[key].cacheClear()
        }
    }
  }
  else {
    for (let key in models) {
      models[key].cacheClear()
    }
    execSh("redis-cli flushdb", function(err){
      if (err) {
        console.log("Exit code: ", err.code);
        return;
      }
    })
  }

  res.send({ status: true }).status(200)
}

const getIp = async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const searchClient = geoIP.lookup(ip)
    res.send({ status: true, userlocation: ip, region: searchClient.region, city: searchClient.city}).status(200)
  } catch (e) {
    res.send({ip: req.ip, error: e.message})
  }
}

const testSitemap = async (req, res) => {
  try {
    await sitemapService()
    
    res.sendFile(`${SITEMAP_CONFIG.PATH}/sitemap.xml`)
  }
  catch (e) {
    console.log(e)
  }
}

module.exports = {
  recaptchaVerify,
  cacheClear,
  getIp,
  testSitemap
}