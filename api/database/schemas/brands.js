const { Schema } = require('mongoose')

const { BRAND_FORMAT, CATEGORY_FORMAT, CATEGORY_PAGE_FORMAT } = require('../aggregation/helpers/resonse-formats')
const { getRegionItem } = require('../aggregation/helpers/helper')
const { BRANDS_LIMIT } = require('../../config/database_constants')

const brandsSchema = new Schema({
  category_id: Schema.Types.ObjectId,
  name: String,
  slug: String,
  img: String,
  path: String
})

brandsSchema.methods.getBrandsList = async function (regionSlug) {
  const brandsModel = this.model('brandsModel')
  const regionModel = this.model('regionsModel')

  const region = await new regionModel().getRegion(regionSlug)

  const brands = brandsModel
    .aggregate()
    .append(getRegionItem(region, 'brand'))
    .match({ "img": { $exists: true } })
    .limit(40)
    .lookup({
      from: 'products',
      let: { brand_id: '$_id' },
      pipeline: 
        new Aggregate() 
          .append(getRegionItem(region, 'product'))
          .match({
            $expr: { 
              $eq: ['$$brand_id', '$brand_id'] 
            } 
          })
          .limit(1)
          .count('count') 
          .pipeline(),
      as: 'products'
    })
    .append({
      $set: {
        disabled: {
          $cond: [{ $gt: [{ $size: '$products' }, 0] }, false, true]
        }
      }
    })
    .project(BRAND_FORMAT)
    .cache()
  
  return brands
}

brandsSchema.methods.getPartsFromBrandsList = async function (regionSlug, skip) {
  const brandsModel = this.model('brandsModel')
  const productsModel = this.model('productsModel')
  const regionsModel = this.model('regionsModel')

  const region = await new regionsModel().getRegion(regionSlug)

  const brands = await brandsModel  
    .aggregate()
    .append(getRegionItem(region, 'brand'))
    .match({
      img: { $exists: true }
    })
    .skip(+skip)
    .limit(5)
  
  for (let brand of brands) {
    const productsCountAggregation = await productsModel
      .aggregate()
      .match({ "regions.product.brand_id": brand._id })
      .count("count")
    
    brand.disabled = productsCountAggregation.count > 0 ? true : false
  }

  return brands
}

brandsSchema.methods.getBrands = async function (brandSlug, query, regionSlug) {
  const brandsModel = this.model('brandsModel')
  const productsModel = this.model('productsModel')
  const regionsModel = this.model('regionsModel')

  // brandsModel.cacheClear()

  const region = await new regionsModel().getRegion(regionSlug)

  const { page = 1, limit = 15, sort, filters } = query
  const skip = +page > 1 ? (+page - 1) * +limit : 0

  const brandAggregation = await brandsModel
    .aggregate()
    .match({ "regions.brand.slug": brandSlug })
    .append(getRegionItem(region, 'brand'))
    .lookup({
      from: 'categories',
      let: { category_id: '$category_id' },
      pipeline:
        new Aggregate()
          .match({
            $expr: {
              $in: ['$$category_id', '$regions.category._id']
            }
          })
          .append(getRegionItem(region, 'category'))
          .project(CATEGORY_PAGE_FORMAT)
          .pipeline(),
      as: 'subcategories'
    })
    .append({
      $set: { neighbors: [] }
    })
    .append({
      $set: {
        cSlug: '$slug',
        categoryName: '$name',
      }
    })
    .project(CATEGORY_PAGE_FORMAT)
    .toObject()
    .cache()

  const brand = brandAggregation

  if(!brand) return false

  const productsObject = await new productsModel().getProducts({
    categoriesIds: [brand._id],
    sort,
    limit,
    skip,
    filters
  }, region)
  const productFilters = query.preload
    ? await new brandsModel().getBrandFilters(brand, region)
    : {}
  brand.count = productsObject.count

  return {
    info: brand,
    products: productsObject.products,
    filters: productFilters
  }
}

brandsSchema.methods.getBrandFilters = async function (brand, region) {
  const productsModel = this.model('productsModel')

  const productsFilters = await new productsModel().getFilters({
    categoriesIds: [brand._id]
  }, region)

  return productsFilters
}

brandsSchema.methods.countBrands = async function (regionSlug) {
  const brandsModel = this.model("brandsModel")
  const regionModel = this.model("regionsModel")
  
  const region = await new regionModel().getRegion(regionSlug)

  const countAggregation = await brandsModel
    .aggregate()
    .match({
      "regions.region": region._id,
      "regions.brand.img": { $exists: true }
    })
    .limit(BRANDS_LIMIT)
    .count("count")
    .toObject()
  
  if(!countAggregation) return 0
  
  return countAggregation.count
}

module.exports = brandsSchema