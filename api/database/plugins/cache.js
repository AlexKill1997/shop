const mongoose = require('mongoose')
const { promisify } = require('util')
const redisModule = require('redis')
const { Types } = require('mongoose')
const checkPort = require('is-port-reachable')

const fs = require('fs')

let count = 0;

function parseId(doc) {
  for (let key in doc) {
    if (Types.ObjectId.isValid(doc[key]) && doc[key].length === 24) doc[key] = Types.ObjectId(doc[key])

    if (doc[key] && doc[key].constructor === Array) {
      doc[key].forEach(docItem => {
        parseId(docItem)
      })
    }
  }
}

function getKey(string) {
  return Buffer.from(string).toString('base64')
}

function ObjectToBase64(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64')
  // return JSON.stringify(obj)
}

function base64ToObject(string) {
  return JSON.parse(Buffer.from(string, 'base64').toString('utf-8'))
  // return JSON.parse(string)
}

function mongoosePreInstall() {
  mongoose.Aggregate.prototype.cache = function () {
    return this
  }

  mongoose.Query.prototype.cache = function () {
    return this
  }

  mongoose.Model.cacheClear = function () {
    return this
  }
}

function mongooseCachePlugin(redis) {
  const exec = mongoose.Query.prototype.exec
  const aggExec = mongoose.Aggregate.prototype.exec

  mongoose.Query.prototype.cache = function(options = { time: 86400 }) {
    this.useCache = true
    this.time = options.time
    this.hashKey = ObjectToBase64(options.key || this.mongooseCollection.name)

    return this
  }

  mongoose.Aggregate.prototype.cache = function(options = { time: 86400 }) {
    this.useCache = true
    this.time = options.time
    this.hashKey = ObjectToBase64(
      options.key || this._model.collection.collectionName
    )

    return this
  }

  mongoose.Model.cacheClear = function () {
    const key = ObjectToBase64(this.collection.collectionName)
    console.log(`Clear cache: ${key}`)
    redis.del(key)
  }

  mongoose.Query.prototype.exec = async function() {
    if (!this.useCache) return await exec.apply(this, arguments)

    const key = ObjectToBase64(
      this.getQuery()
    )

    const cachedValue = await redis.hget(this.hashKey, key)

    if (cachedValue) {
      console.log(`Load cached data: ${this._model.collection.collectionName}\n`)

      const doc = base64ToObject(cachedValue)
      if(!doc) return null
      if (doc.constructor === Array) {
        return doc.map((doc) => {
          return new doc()
        })
      } else return new doc()
    }

    console.log(`Use cache: ${this._model.collection.collectionName}\n${key}`)

    const res = await exec.apply(this, arguments)
    redis.hset(this.hashKey, key, ObjectToBase64(res))
    redis.expire(this.hashKey, this.time)

    return res
  }

  mongoose.Aggregate.prototype.exec = async function() {
    if (!this.useCache) return await aggExec.apply(this, arguments)

    const key = ObjectToBase64(
      this._pipeline
    )

    const cachedValue = await redis.hget(this.hashKey, key)

    if (cachedValue) {
      console.log(`Load cached data: ${this._model.collection.collectionName}\n`)

      const doc = base64ToObject(cachedValue)
      if(!doc) return null
      if (doc.constructor === Array) {
        return doc.map((doc) => {
          parseId(doc)
          return doc
        })
      } else {
        parseId(doc)
        return doc
      }
    }

    console.log(`Use cache: ${this._model.collection.collectionName}\n${key}`)

    const res = await aggExec.apply(this, arguments)
    redis.hset(this.hashKey, key, ObjectToBase64(res))
    redis.expire(this.hashKey, this.time)

    return res
  }
}

module.exports = async () => {
  mongoosePreInstall()

  if(process.env.NODE_ENV !== "production") return

  const redisCheck = await checkPort(process.env.REDIS_PORT, { host: process.env.REDIS_HOST })
  if(!redisCheck) return console.warn("Redis not found, cache is disabled")
  
  const redis = redisModule.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    retry_strategy: function(options) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error('The server refused the connection')
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retry time exhausted')
      }
      if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000)
    }
  })

  redis.hget = promisify(redis.hget)

  redis.on('ready', m => {
    console.log('Redis succesfully connected')

    mongooseCachePlugin(redis)
  })
}