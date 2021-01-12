const fs = require('fs');
const path = require('path');

const SITEMAP_CONFIG = require('../config/sitemap');
const js2xmlparser = require('js2xmlparser');
const moment = require('moment');
const { model, Aggregate } = require('mongoose');
const { resolve } = require('path');
const { getRegionItem, getRegionItemByRegionID } = require('../database/aggregation/helpers/helper');
const { glob } = require('glob');
const chalk = require('chalk');

const LIMIT = 5000

async function getAllRegions() {
  const regionsModel = model("regionsModel");

  const regions = await regionsModel.find({}).lean()

  return regions
}

async function getAllCategories() {

  const regions = await getAllRegions()
  const categories = []

  const categoriesModel = model("categoriesModel")
  const brandsModel = model("brandsModel")

  while (true) {
    const DBResult = await categoriesModel
      .aggregate()
      .match({ "regions.category.parent_id": { $exists: false } })
      .unwind({
        path: "$regions"
      })
      .project({
        _id: "$regions.category._id",
        region: "$regions.region",
        cSlug: "$regions.category.cSlug",
        updatedAt: "$updatedAt"
      })
      .cache()
    
    console.log(chalk.green(`Категорий 1 уровня: ${DBResult.length}`))
        
    for (let level_0 of DBResult) {
      level_0.children = await categoriesModel
        .aggregate()
        .match({
          "regions.category.parent_id": level_0._id
        })
        .append(getRegionItemByRegionID(level_0.region, 'category'))
        .project({
          cSlug: "$cSlug",
          updatedAt: "$updatedAt"
        })
        .cache()
      
      console.log(chalk.green(`Категорий 2 уровня(${level_0.cSlug}): ${level_0.children.length}`))
      
      for (let level_1 of level_0.children) {
        const brands = await brandsModel
          .aggregate()
          .match({
            "regions.brand.category_id": level_1._id
          })
          .append(getRegionItemByRegionID(level_0.region, 'brand'))
          .project({
            type: 'brand',
            cSlug: "$slug",
            updatedAt: "$updatedAt"
          })
          .cache()
        
        const subcategories = await categoriesModel
          .aggregate()
          .match({
            "regions.category.parent_id": level_1._id
          })
          .append(getRegionItemByRegionID(level_0.region, 'category'))
          .project({
            type: 'category',
            cSlug: "$cSlug",
            updatedAt: "$updatedAt"
          })
          .cache()
        
        level_1.children = [
          ...subcategories,
          ...brands
        ]

        console.log(chalk.green(`Категорий/брендов 3 уровня(${level_0.cSlug}/${level_1.cSlug}): ${level_1.children.length}`))
      }
    }

    for (level_0 of DBResult) {
      const _region = regions.find(region => region._id.equals(level_0.region))
      categories.push({
        cSlug: level_0.cSlug,
        region: _region.value,
        updatedAt: level_0.updatedAt
      })
      for (level_1 of level_0.children) {
        level_1.cSlug = `${level_0.cSlug}/${level_1.cSlug}`
        categories.push({
          cSlug: level_1.cSlug,
          region: _region.value,
          updatedAt: level_1.updatedAt
        })

        for (level_2 of level_1.children) {
          level_2.cSlug = `${level_1.cSlug}/${level_2.cSlug}`
          categories.push({
            cSlug: level_2.cSlug,
            region: _region.value,
            updatedAt: level_2.updatedAt
          })
        }
      }
    }
    
    return categories
  }
}

async function getAllProducts() {
  let paging = 0;

  const regions = await getAllRegions()
  const products = []

  const productsModel = model("productsModel")

  const globalCountAggregation = await productsModel
    .aggregate()
    .unwind({
      path: "$regions"
    })
    .group({
      _id: null,
      count: {
        $sum: 1
      }
    })
    .toObject()
  
  const globalCount = globalCountAggregation.count
  
  console.log(chalk.cyan(`Общее количество товаров: ${globalCount}`))

  while (true) {
    const DBResult = await productsModel
      .aggregate()
      .unwind({
        path: "$regions"
      })
      .skip(LIMIT * paging)
      .limit(LIMIT)
      .project({
        region: "$regions.region",
        _id: "$regions.product._id",
        slug: "$regions.product.slug",
        updatedAt: "$updatedAt",
      })
      // .group({
      //   _id: "$region",
      //   products: {
      //     $addToSet: "$product"
      //   },
      //   updatedAt: {
      //     $addToSet: "$updatedAt"
      //   }
      // })
      .cache()
    
    console.log(chalk.cyan(`Загружено: ${DBResult.length}`))
    
    paging++
    
    DBResult.forEach(product => {
      const _region = regions.find(region => region._id.equals(product.region))

      products.push({
        ...product,
        region: _region.value
      })
      
      // if (_region) {
      //   const { value } = _region
      //   const regionProductsObject = products.find(o => o.region === _region.value)
      //   if (!regionProductsObject) products.push(...regionObject.products.map(product => ({ ...product, region: value })) )
      //   else products.concat(regionObject.products)        
      // }
    })

    console.log(chalk.cyan(`Страница: ${paging}, Загружено ${products.length} товаров из ${globalCount}`))

    // console.log(DBProducts.length, paging)

    if(DBResult.length === 0) break

    // if (paging > 3) break;
  }
  
  return products
}

module.exports = async () => {
  const categories = await getAllCategories()
  const products = await getAllProducts()
  const regions = await getAllRegions()

  const now = moment().format("YYY-MM-DD")

  console.log(chalk.cyan(`Генерируем sitemap...`))
  console.log(chalk.cyan(`Генерация статических страниц...`))

  const regionPages = regions.map(region => ({
    loc: `${SITEMAP_CONFIG.HOST}/region/${region.value}/`,
    lastMod: now,
    changeFreq: 'monthly',
    proiroty: 0.5
  }))

  const staticPages = glob
    .sync(resolve(__dirname, "../../pages/!(_)*.vue"))
    .map(static => ({
      loc: `${SITEMAP_CONFIG.HOST}/${path.basename(static, ".vue")}/`,
      lastMod: now,
      changeFreq: 'monthly',
      proiroty: 0.5
    }))

  const mainSitemap = {
    sitemapindex: []
  }

  const sitemapRoot = {
    "@": {
      xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
      'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
      'xsi:schemaLocation': "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    },
    url: []
  }

  const sitemaps = []
  const routes = []

  routes.push(
    {
      loc: `${SITEMAP_CONFIG.HOST}/`,
      lastMod: now
    },
    ...regionPages,
    ...staticPages,
  )

  console.log(chalk.cyan(`Генерация категорий...`))

  categories.forEach(category => {
    routes.push({
      lastMod: moment(category.updatedAt).format("YYYY-MM-DD"),
      loc: `${SITEMAP_CONFIG.HOST}/catalog/region/${category.region}/category/${category.cSlug}/`,
      changeFreq: 'weekly',
      proiroty: 1.0
    })
  })

  console.log(chalk.cyan(`Генерация товаров...`))

  products.forEach(product => {
    routes.push({
      lastMod: moment(product.updatedAt).format("YYYY-MM-DD"),
      loc: `${SITEMAP_CONFIG.HOST}/products/region/${product.region}/${product.slug}/`,
      changeFreq: 'hourly',
      proiroty: 1.0
    })
  })

  let tmpCounter = 0;
  let tmpSitemapIndex = 0;

  for (let route of routes) {
    if (tmpCounter > 50000) {
      tmpSitemapIndex++
      tmpCounter = 0;
    }

    if (!sitemaps[tmpSitemapIndex]) {
      sitemaps[tmpSitemapIndex] = {
        name: `sitemap_${tmpSitemapIndex + 1}.xml`,
        url: []
      }
    }

    sitemaps[tmpSitemapIndex].url.push(route)

    tmpCounter++
  }

  console.log(chalk.cyan(`Генерация файлов...`))

  for (sitemap of sitemaps) {
    const url = sitemap.url

    fs.writeFileSync(`${SITEMAP_CONFIG.PATH}/${sitemap.name}`, js2xmlparser.parse("urlset", {
      ...sitemapRoot,
      url
    }))
  }

  sitemaps.forEach(sitemap => {
    mainSitemap.sitemapindex.push({
      loc: `${SITEMAP_CONFIG.HOST}/${sitemap.name}`
    })
  })
  
  const xml = js2xmlparser.parse("sitemapindex", {
    ...sitemapRoot,
    sitemap: mainSitemap.sitemapindex
  })

  fs.writeFileSync(`${SITEMAP_CONFIG.PATH}/sitemap.xml`, xml)

  console.log(chalk.cyan(`Sitemap успешно сгенерирован`))
}