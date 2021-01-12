const mongoose = require('mongoose')

const exec = mongoose.Aggregate.prototype.exec;

module.exports = () => {
  mongoose.Aggregate.prototype.exec = async function() {
    const res = await exec.apply(this, arguments)
    
    if (this.isObject && Array.isArray(res)) {
      if (res.length > 1) {
        return res
      }
      else return res[0] || null
    }
    else return res
  }

  mongoose.Aggregate.prototype.toObject = function () {
    this.isObject = true

    return this
  }

  mongoose.Aggregate.prototype.toNull = function () {
    this.isNullable = true
  }
}
