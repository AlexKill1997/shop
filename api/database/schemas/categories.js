const { Schema, Types, Aggregate } = require('mongoose')

const { CATEGORY_FORMAT, CATEGORY_PAGE_FORMAT } = require('../aggregation/helpers/resonse-formats')
const { getRegionItem } = require('../aggregation/helpers/helper')
const escapeCharacters = require('../modules/escapeCharacters')
const {
  getMenuChildrenCategoryStages,
  getChildrenCategoryStages,
  getChildrenBrandStages,
  getNeighborCategoryStages,
  getChildrenNeighborsCategoryStages,
  getChildrenNeighborsBrandStages
} = require('../aggregation/stages/categories')
const {
  menuChildrenBrandLookup,
  menuChildrenCategoryLookup,
  childrenCategoryLookup,
  childrenBrandLookup
} = require('../aggregation/lookup/categories')

const categorySchema = new Schema({
  parent_id: Schema.Types.ObjectId,
  categoryName: String,
  meta: {
    title: String,
    keywords: String,
    description: String
  },
  cSlug: String,
  link: String,
  nesting: Number,
  views_count: Number, required: false, default: 0,
  order: Number,
  path: String,
  description: String,
  img: String,
  iconPath: String,
  icon: String
})

categorySchema.methods.getCategories = async function (region) {
  const categoriesModel = this.model('categoriesModel')

  const categories = await categoriesModel.getAllCategories(region)
  
  return categories
}

categorySchema.statics.getAllCategories = async function (regionSlug) {
  const categoriesModel = this.model('categoriesModel')
  const regionsModel = this.model("regionsModel")

  // categoriesModel.cacheClear()

  const region = await new regionsModel().getRegion(regionSlug)

  const categories = await categoriesModel
    .aggregate()
    .match({
      "regions.category.parent_id": { $exists: false },
      "regions.region": region._id
    })
    .append(getRegionItem(region, "category"))
    // join категорий 1 уровня
    .lookup({
      from: 'categories',
      let: { parent_id: '$_id' },
      pipeline: 
        new Aggregate()
          // фильтр категорий второго уровня
          .append(getMenuChildrenCategoryStages(region))
          // join категорий 2 уровня
          .append(menuChildrenCategoryLookup(region))
          // join брендов категорий 1 уровня
          .append(menuChildrenBrandLookup(region))
          // объединение в общий массив children
          .addFields({
            children: {
              $concatArrays: ["$brands", "$subcategories"],
            }
          })
          .project(CATEGORY_FORMAT)
          .pipeline(),
      as: 'children'
    })
    .sort({"order": 1})
    .project(CATEGORY_FORMAT)
    .cache()
  
  return categories
}

categorySchema.methods.getCategory = async function (categoryName, subcategoryName, query, regionSlug) {
  const { page = 1, limit = 15, filters, sort } = query

  const skip = +page > 1 ? (+page - 1) * +limit : 0
  const categoryModel = this.model('categoriesModel')
  const productsModel = this.model('productsModel')
  const regionModel = this.model('regionsModel')

  let category, subcategory;

  // categoryModel.cacheClear()

  const region = await new regionModel().getRegion(regionSlug)

  category = await categoryModel
    .aggregate()
    .match({
      "regions.category.cSlug": categoryName
    })
    .append(getRegionItem(region, 'category'))
    .toObject()
  
  console.log(`____________${regionSlug}__________`)

  if (category) {
    subcategory = await categoryModel
    .aggregate()
    .match({
      "regions.category.cSlug": subcategoryName,
      "regions.category.parent_id": category._id
    })
    .append(getRegionItem(region, 'category'))
    .lookup({
      from: 'categories',
      let: { parent_id: '$_id' },
      pipeline: [
        ...getChildrenCategoryStages(region),
        {
          $project: CATEGORY_PAGE_FORMAT
        }
      ],
      as: 'subcategories_cats'
    })
    .lookup({
      from: 'brands',
      let: { parent_id: '$_id' },
      pipeline: [
        ...getChildrenBrandStages(region),
        {
          $project: CATEGORY_PAGE_FORMAT
        }
      ],
      as: 'subcategories_brands'
    })
    .append({
      $set: {
        subcategories: {
          $concatArrays: ["$subcategories_cats", "$subcategories_brands"]
        }
      }
    })
    .lookup({
      from: 'categories',
      let: { parent_id: '$parent_id' },
      pipeline: [
        ...getNeighborCategoryStages(region),
        {
          $project: CATEGORY_PAGE_FORMAT
        }
      ],
      as: 'neighbors'
    })
    .sort({"order": 1})
    .project(CATEGORY_PAGE_FORMAT)
    .toObject()
    .cache()    
  }
  
  if (!subcategory) return false

  if (!subcategory.subcategories) subcategory.subcategories = []
  
  const productsObject = await new productsModel().getProducts({
    categoriesIds: [
      subcategory._id,
      ...subcategory.subcategories.map((subcat) => subcat._id)
    ],
    sort,
    limit,
    skip,
    filters
  }, region)
  const productFilters = query.preload
    ? await new categoryModel().getCategoryFilters(subcategory, region)
    : {}
  subcategory.count = productsObject.count

  return {
    info: subcategory,
    products: productsObject.products,
    filters: productFilters
  }
}

categorySchema.methods.getSubcategory = async function (categoryName, subcategoryName, grandcategoryName, query, regionSlug) {
  const { page = 1, limit = 15, filters, sort } = query

  let category, subcategory, grandcategory, brand;

  const skip = +page > 1 ? (+page - 1) * +limit : 0
  const categoryModel = this.model('categoriesModel')
  const productsModel = this.model('productsModel')
  const regionsModel = this.model('regionsModel')
  const brandModel = this.model('brandsModel')

  // categoryModel.cacheClear()

  const region = await new regionsModel().getRegion(regionSlug)

  category = await categoryModel
    .aggregate()
    .match({
      "regions.category.cSlug": categoryName
    })
    .append(getRegionItem(region, 'category'))
    .toObject()

  if (category) {
    subcategory = await categoryModel
    .aggregate()
    .match({
      "regions.category.cSlug": subcategoryName,
      "regions.category.parent_id": category._id
    })
    .append(getRegionItem(region, 'category'))
    .toObject()    
  }

  if (subcategory) {
    brand = await brandModel
    .aggregate()
    .match({
      "regions.brand.slug": grandcategoryName,
      "regions.brand.category_id": subcategory._id
    })
    .append(getRegionItem(region, 'brand'))
    .lookup({
      from: 'categories',
      let: { parent_id: '$category_id' },
      pipeline: [
        ...getChildrenNeighborsCategoryStages(region),
        {
          $project: CATEGORY_PAGE_FORMAT
        },
      ],
      as: 'subcategories_cats'
    })
    // .sort({"subcategories_cats.order": 1})
    .lookup({
      from: 'brands',
      let: { category_id: '$category_id' },
      pipeline: [
        ...getChildrenNeighborsBrandStages(region),
        {
          $project: CATEGORY_PAGE_FORMAT
        }
      ],
      as: 'subcategories_brands'
    })
    .append({
      $set: {
        cSlug: "$slug",
        categoryName: "$name",
        subcategories : {
          $concatArrays: ["$subcategories_cats", "$subcategories_brands"]
        }
      }
    })
    .sort({"order": 1})
    .project(CATEGORY_PAGE_FORMAT)
    .toObject()
  
  grandcategory = await categoryModel
    .aggregate()
    .match({
      "regions.category.cSlug": grandcategoryName,
      "regions.category.parent_id": subcategory._id
    })
    .append(getRegionItem(region, "category"))
    .lookup({
      from: 'categories',
      let: { parent_id: '$parent_id' },
      pipeline: [
        ...getChildrenCategoryStages(region),
        {
          $project: CATEGORY_PAGE_FORMAT
        }
      ],
      as: 'subcategories_cats'
    })
    .lookup({
      from: 'brands',
      let: { parent_id: '$parent_id' },
      pipeline: [
        ...getChildrenBrandStages(region),
        {
          $project: CATEGORY_PAGE_FORMAT
        }
      ],
      as: 'subcategories_brands'
    })
    .append({
      $set: {
        subcategories: {
          $concatArrays: ["$subcategories_cats", "$subcategories_brands"]
        }
      }
    })
    .sort({"order": 1})
    .project(CATEGORY_PAGE_FORMAT)
    .toObject()
    .cache()    
  }


  const currentCategory = brand || grandcategory

   if (!currentCategory) return false
  
  const productsObject = await new productsModel().getProducts({
    categoriesIds: [currentCategory._id],
    sort,
    limit,
    skip,
    filters
  }, region)

  const productsFIlters = query.preload
    ? await new categoryModel().getSubcategoryFilters(currentCategory, region)
    : {}
    currentCategory.count = productsObject.count
  
  return {
    info: currentCategory,
    products: productsObject.products,
    filters: productsFIlters
  }
}

categorySchema.methods.countCategoryProducts = async function ({
  category: categorySlug = "",
  subcategory: subcategorySlug = "",
  grandcategory: grandcategorySlug = "",
}, regionSlug) {
  const categoryModel = this.model("categoriesModel")
  const regionModel = this.model("regionsModel")
  const brandModel = this.model("brandsModel")
  const productsModel = this.model("productsModel")

  const region = await new regionModel().getRegion(regionSlug)

  let category, subcategory, grandcategory, brand;

  category = await categoryModel
    .aggregate()
    .match({
      "regions.category.cSlug": categorySlug
    })
    .append(getRegionItem(region, 'category'))
    .toObject()
    .cache()

  if (subcategorySlug) {
    subcategory = await categoryModel
      .aggregate()
      .match({
        "regions.category.cSlug": subcategorySlug,
        "regions.category.parent_id": category._id
      })
      .append(getRegionItem(region, 'category'))
      .append(childrenCategoryLookup(region))
      .append(childrenBrandLookup(region))
      .toObject()
      .cache()
  }

  if (grandcategorySlug) {
    brand = await brandModel
      .aggregate()
      .match({
        "regions.brand.slug": grandcategorySlug,
        "regions.brand.category_id": subcategory._id
      })
      .append(getRegionItem(region, "brand"))
      .toObject()
      .cache()
  
    grandcategory = await categoryModel
      .aggregate()
      .match({
        "regions.category.cSlug": grandcategorySlug,
        "regions.category.parent_id": subcategory._id
      })
      .append(getRegionItem(region, "category"))
      // categoryAggregation.append({
      //   $set: {
      //     subcategories: {
      //       $concat: ["$subcategories, $brands"]
      //     }
      //   }
      // })
      .toObject()
      .cache()
  }
  
  const currentCategory = brand || grandcategory || subcategory || category
  
  if (!currentCategory) return null

  if (!currentCategory.subcategories) currentCategory.subcategories = []
  if (!currentCategory.brands) currentCategory.brands = []
  
  const count = await new productsModel().countCategoryProducts({
    categories: [
      currentCategory._id,
      ...currentCategory.subcategories.map(s => s._id),
      ...currentCategory.brands.map(b => b._id)
    ]
  })

  return count
}
 
categorySchema.methods.searchCategory = async function (search, regionSlug) {
  const categoryModel = this.model('categoriesModel')
  const regionsModel = this.model("regionsModel")

  const region = await new regionsModel().getRegion(regionSlug)

  search = escapeCharacters(search)

  const categories = await categoryModel
    .aggregate()
    .match({ "regions.category.categoryName": new RegExp(`${search}`, 'i') })
    .append(...getRegionItem(region, 'category'))
    .limit(5)
    .project(CATEGORY_FORMAT)

  return categories
}

categorySchema.methods.getCategoryFilters = async function (category, region) {
  const productsModel = this.model('productsModel')

  const productsFilters = await new productsModel().getFilters({
    categoriesIds: [
      category._id,
      ...category.subcategories.map((subcat) => subcat._id)
    ]
  }, region)

  return productsFilters
}

categorySchema.methods.getSubcategoryFilters = async function (category, region) {
  const productsModel = this.model('productsModel')

  const productsFilters = await new productsModel().getFilters({
    categoriesIds: [category._id]
  }, region)

  return productsFilters
}

categorySchema.methods.getViewsCount = function (category, region) {
  console.log(category)
}

module.exports = categorySchema