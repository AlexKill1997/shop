const { Schema } = require('mongoose')

const { REGIONS_FORMAT } = require('../aggregation/helpers/resonse-formats')

const DB_CONTANTS = require('../../config/database_constants')

class NewSchema {
  constructor(obj, options) {
    const schema = new Schema(obj, options)
    schema.loadClass(this.constructor)

    return schema
  }
}

class Region extends NewSchema {
  constructor() {
    super({
      value: String,
      title: String,
      phones: [Number],
      email: String
    })
  }

  static async getRegions(region) {
    const regionsModel = this.model('regionsModel')
    const regions = {}
  
    regions.options = await regionsModel
      .aggregate()
      .sort({ order: 1 })
      .project(REGIONS_FORMAT)
    regions.current = await new regionsModel().getRegion(region)
  
    return regions
  }

  async getRegion(region) {
    const regionsModel = this.model('regionsModel')
    const currentRegion = await regionsModel
      .aggregate()
      .match({ value: region || DB_CONTANTS.DEFAULT_REGION })
      .project(REGIONS_FORMAT)
      .toObject()
      .cache()
    return currentRegion
  }

  async getRegionByISO(regionISO) {
    const regionsModel = this.model('regionsModel')
    const currentRegion = await regionsModel
      .aggregate()
      .match({ ISO: regionISO || DB_CONTANTS.DEFAULT_REGION })
      .project(REGIONS_FORMAT)
      .toObject()
      .cache()
  
    return currentRegion
  }
}

module.exports = new Region()

///////////////
///////////////

// const regionSchema = new Schema({
//   value: String,
//   title: String,
//   phones: [Number],
//   email: String
// })

// regionSchema.methods = {
//   getRegions(region) {
//     const regionsModel = this.model('regionsModel')
//     const regions = {}

//     regions.options = await regionsModel
//       .aggregate()
//       .sort({ order: 1 })
//       .project(REGIONS_FORMAT)
//     regions.current = await new regionsModel().getRegion(region)

//     return regions
//   },

//   getRegion(region) {
//     const regionsModel = this.model('regionsModel')
//     const currentRegion = await regionsModel
//       .aggregate()
//       .match({ value: region || DB_CONTANTS.DEFAULT_REGION })
//       .project(REGIONS_FORMAT)
//       .toObject()
//       .cache()
//     return currentRegion
//   },

//   getRegionByISO(regionISO) {
//     const regionsModel = this.model('regionsModel')
//     const currentRegion = await regionsModel
//       .aggregate()
//       .match({ ISO: regionISO || DB_CONTANTS.DEFAULT_REGION })
//       .project(REGIONS_FORMAT)
//       .toObject()
//       .cache()

//     return currentRegion
//   }
// }

// module.exports = regionSchema
