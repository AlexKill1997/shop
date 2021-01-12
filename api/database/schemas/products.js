const { Schema } = require('mongoose')

const sortMethodProducts = require('../modules/getSortType')
const escapeCharacters = require('../modules/escapeCharacters')

const { PRODUCT_FORMAT, PAGE_PRODUCT_FORMAT, CATEGORY_PAGE_FORMAT } = require('../aggregation/helpers/resonse-formats')
const { getRegionItem } = require('../aggregation/helpers/helper')
const { getAdditionalProductsFieldByProduct } = require('../aggregation/lookup/products')

const productsSchema = new Schema({
  category_id: Schema.Types.ObjectId,
  brand_id: Schema.Types.ObjectId,
  title: String,
  slug: String,
  article: Number,
  cost: Number,
  club_cost: Number,
  unit: String,
  description: String,
  options: Array,
  discount: {
    type: Boolean,
    required: false
  },
  discount_price: {
    type: Number,
    required: false
  },
  meta: {
    title: String,
    keywords: String,
    description: String
  },
  images: [String],
  path: String
})

productsSchema.methods.getProducts = async function ({
  skip,
  limit,
  filters,
  categoriesIds = [],
  sort
}, region) {
  const productsModel = this.model('productsModel')

  // productsModel.cacheClear()

  const countAggregate = await productsModel
    .aggregate()
    .match({
      $or: [
        { "regions.product.category_id": { $in: categoriesIds } },
        { "regions.product.brand_id": { $in: categoriesIds } },
      ]
    })
    .append(getRegionItem(region, 'product'))
    .append({ $set: { product: '$$ROOT' } })
    .match(filters)
    .count('count')
    .toObject()
    .cache()

  const productsAggregate = productsModel
    .aggregate()
    .match({
      $or: [
        { "regions.product.category_id": { $in: categoriesIds } },
        { "regions.product.brand_id": { $in: categoriesIds } },
      ]
    })
    .append(getRegionItem(region, 'product'))
    .append({ $set: { product: '$$ROOT' } })
    .match(filters)

  if (sort) {
    productsAggregate.sort(sortMethodProducts(sort))
  }

  productsAggregate
    .skip(skip)
    .limit(+limit)
    .project(PRODUCT_FORMAT)
    .cache()

  const products = await productsAggregate
  const count = countAggregate || { count: 0 }
  return { count: count.count, products }
}


productsSchema.methods.countCategoryProducts = async function ({
  categories
}, regionSlug) {
  const productsModel = this.model("productsModel")
  const regionsModel = this.model("regionsModel")

  // const region = await new regionsModel().getRegion(regionSlug)

  const productsCountAggregation = await productsModel
    .aggregate()
    .match({
      $or: [
        {
          "regions.product.category_id": {
            $in: categories
          }
        },
        {
          "regions.product.brand_id": {
            $in: categories
          }
        }
      ]
    })
    .count("count")
    .toObject()
    .cache()
  
  if(productsCountAggregation) return productsCountAggregation.count
  else return "0"
}

productsSchema.methods.getFilters = async function ({
  categoriesIds = [],
}, region) {
  const productsModel = this.model('productsModel')

  const filtersAggregate = productsModel
    .aggregate()
    .match({
      $or: [
        { "regions.product.category_id": { $in: categoriesIds } },
        { "regions.product.brand_id": { $in: categoriesIds } },
      ]
    })
    .append(getRegionItem(region, 'product'))
    .project({
      filters: '$options'
    })
    .unwind({
      path: '$filters'
    })
    .replaceRoot('$filters')
    .replaceRoot({
      $arrayElemAt: [
        {
          $objectToArray: '$$ROOT'
        },
        0
      ]
    })
    .match({
      k: {
        $not: {
          $in: ['Артикул']
        }
      }
    })
    .group({
      _id: '$k',
      filter: {
        $push: '$v'
      }
    })
    .project({
      filter: {
        $setUnion: '$filter'
      }
    })
    .cache()

  const filters = await filtersAggregate

  // console.log(filters)
  const filtersObject = {}

  filters.forEach((filter) => {
    filtersObject[filter._id] = filter.filter
  })

  return filtersObject
}

productsSchema.methods.getProductById = async function (id, regionparam) {
  const model = this.model('productsModel')
  const regionsModel = this.model('regionsModel')
  const categoriesModel = this.model("categoriesModel")
  const brandsModel = this.model("brandsModel")

  const region = await new regionsModel().getRegion(regionparam)

  const productAggregate = await model
    .aggregate()
    .match({ "regions.product.slug": id })
    .append(getRegionItem(region, 'product'))
    .append(getAdditionalProductsFieldByProduct(region, "buyed"))
    .append(getAdditionalProductsFieldByProduct(region, "recomended", "same"))
    .limit(1)
    .project({
      ...PAGE_PRODUCT_FORMAT,
      category_id: "$category_id",
      brand_id: "$brand_id"
    })
    .toObject()
    .cache()
  
  const product = productAggregate

  if(!product) return false

  if (!product.same) product.same = []
  if (!product.buyed) product.buyed = []
  
  if (product.category_id === undefined) product.category_id = null
  if (product.brand_id === undefined) product.brand_id = null

  let brand, category;

  if (product.brand_id) {
    brand = await brandsModel
      .aggregate()
      .match({
        "regions.brand._id": product.brand_id
      })
      .append(getRegionItem(region, 'brand'))
      .project({
        parent_id: "$category_id"
      })
      .toObject()
  }

  if (product.category_id) {
    category = await categoriesModel
      .aggregate()
      .match({
        "regions.category._id": product.category_id
      })
      .append(getRegionItem(region, 'category'))
      .project({
        parent_id: "$parent_id"
      })
      .toObject()
  }
  
  const currentCategory = brand || category || {}

  let tmpCategory = currentCategory

  while (tmpCategory.parent_id) {
    tmpCategory.parent = await categoriesModel
      .aggregate()
      .match({
        "regions.category._id": tmpCategory.parent_id
      })
      .append(getRegionItem(region, "category"))
      .project({
        parent_id: "$parent_id"
      })
      .toObject()
    
    tmpCategory = tmpCategory.parent || {}
  }

  console.log(currentCategory)

  product.category = currentCategory

  return product
}

productsSchema.methods.getProductsByArticle = async function (articles, regionparam) {
  const model = this.model('productsModel')
  const regionsModel = this.model('regionsModel')
  const region = await new regionsModel().getRegion(regionparam)

  const productAggregate = await model
    .aggregate()
    .match({ "regions.product.article": { $in: articles } })
    .append(getRegionItem(region, 'product'))
    .project(PAGE_PRODUCT_FORMAT)
    // .cache()

  const product = productAggregate
  return product
}

productsSchema.methods.searchByArticle = async function (article, regionparam) {
  const regionsModel = this.model('regionsModel')

  const region = await new regionsModel().getRegion(regionparam)

  const productsModel = this.model('productsModel')

  const products = await productsModel
    .aggregate()
    .append(getRegionItem(region, 'product'))
    .append({
      $set: {
        sArticle: {
          $toString: "$article"
        }
      }
    })
    .match({ "sArticle": new RegExp(`^${article}`) })
    .limit(5)
    .project(PRODUCT_FORMAT)
  // .cache()

  return products

}

productsSchema.methods.searchProduct = async function (search, regionSlug) {
  const productsModel = this.model('productsModel')
  const regionsModel = this.model("regionsModel")

  const region = await new regionsModel().getRegion(regionSlug)

  search = escapeCharacters(search)

  const regex = new RegExp(`${search}`, 'i')

  const find = search.match(/\D/g) ? { title: regex } : { sArticle: regex }
  const products = await productsModel
    .aggregate()
    .append(getRegionItem(region, 'product'))
    .append({
      $set: {
        sArticle: {
          $toString: "$article"
        }
      }
    })
    .match(find)
    .limit(10)
    .project(PRODUCT_FORMAT)
  
  return products
}

productsSchema.methods.getSalesProducts = async function (regionSlug) {
  const regionsModel = this.model("regionsModel")
  const productsModel = this.model("productsModel")
  const regionsModelPrototype = new regionsModel

  const region = await regionsModelPrototype.getRegion(regionSlug)

  const salesProducts = await productsModel
    .aggregate()
    .match({ "regions.product.discount": true })
    .append(getRegionItem(region, "product"))
    .limit(5)
    .cache()
  
  if (salesProducts) return salesProducts
  else return false
}

module.exports = productsSchema