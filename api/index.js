const express = require('express')
const app = express()
// const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer');
const cookieParser = require('cookie-parser');
const isGenerate = process.env.BUILD_MODE === 'generate'
const DBManager = require('./database')
const { create } = DBManager

const { model } = require('mongoose');

const mailService = require('./services/nodemailer');

//
const auth = require('./middleware/auth');
const dbInit = require('./middleware/dbInit');
const region = require('./middleware/region')
//

const categoryController = require('./controllers/category');
const mainController = require('./controllers/main');
const brandsController = require('./controllers/brands');
const productsController = require('./controllers/products');
const searchController = require('./controllers/search');
const authController = require('./controllers/auth');
const orderController = require('./controllers/orders');
const callbackController = require('./controllers/callback');
const clientsController = require('./controllers/clients');
const servicesController = require('./controllers/services');
const regionsController = require('./controllers/regions');

create()

const router = express.Router()


// const corsOptions = {
//   origin: [
//     'https://xn--j1ano.com',
//     /localhost:.*/
//   ],
//   allowedHeaders: {
//     'Access-Control-Allow-Credentials': true
//   },
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// router.use(cors(corsOptions))
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(new multer().any())
router.use(cookieParser());

router.use(dbInit)
router.use(region)
// router.use(auth)

const ClientsModel = model("clientsModel")

// ClientsModel.watch().on('change', change => {
//   console.log(change)
// })

// router.use(auth)

// main
router.get('/mainData', mainController.mainData)
router.get('/setRegion/:region?', regionsController.setRegion)

// category
router.get('/getRegionRoutes/:slug', categoryController.getRegionRoutes)
router.get('/getProducts/:cat/:subcat', categoryController.getProductsCategory)
router.get('/getProducts/:cat/:subcat/:grandcat', categoryController.getProductsSubcategory)
router.get('/categories/countProducts/:category', categoryController.countCategoryProducts)
router.get('/categories/countProducts/:category/:subcategory', categoryController.countCategoryProducts)
router.get('/categories/countProducts/:category/:subcategory/:grandcategory', categoryController.countCategoryProducts)


router.get('/categories/countProducts/:category', categoryController.getViewsCountCategory)
router.get('/categories/countProducts/:category/:subcategory', categoryController.getViewsCountCategory)
router.get('/categories/countProducts/:category/:subcategory/:grandcategory', categoryController.getViewsCountCategory)

// brands
router.get('/brands/get', brandsController.getPartsOfBrandsList)
router.get('/brands/count', brandsController.countBrands)
router.get('/brands/:brand/', brandsController.getBrandsProducts)

// products
router.get('/getProduct/:id', productsController.getProductById)

// search
router.post('/searchByArticle', searchController.searchByArticle)
router.post('/search', searchController.search)

// services
router.post('/services/recaptcha', servicesController.recaptchaVerify)
router.get('/cache-clear', servicesController.cacheClear)
router.get('/ip', servicesController.getIp)
router.get('/sitemap', servicesController.testSitemap)

// auth
router.post('/auth', authController.register)
router.post('/auth/login', authController.login)
router.post('/auth/recover', authController.recoverPassword)
router.get('/auth/sign', auth, authController.sign)
router.get('/auth/logout', authController.logout)

// order
router.post('/order', orderController.oneClickOrder)
router.post('/payment', orderController.createOrder)
router.get('/orders', orderController.getOrders)
router.get('/orders/manager/:id', orderController.managerVerify)

// callback
router.post('/callback', callbackController.callback)
router.post('/freeCall', callbackController.freeCall)
// client
router.post('/clients/update', clientsController.updateClient)
router.post('/calculate', callbackController.calculate)

router.post('/another', (req, res) => {
  res.send('meow!')
})

router.use('*', (req, res) => {
  res.sendStatus(404)
})

if (isGenerate) {
  // middleware
  app.use('/api', router)
  // парсинг json, который пришёл с фронта
  app.use(bodyParser.json())
  // запуск сервера на порту
  app.listen(8081, () => {
    console.log('Endpoint started')
  })
}

module.exports = {
  path: '/api/',
  handler: router
}
