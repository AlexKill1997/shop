const { PRODUCT_FORMAT } = require('../helpers/resonse-formats')
const { getRegionItem } = require('../helpers/helper')
const { Aggregate } = require('mongoose')

const getAdditionalProductsFieldByProductStages = (region, fieldKey) =>
  new Aggregate()
    .append(getRegionItem(region, 'product'))
    .addFields({
      temp: '$$products_array_key'
    })
    .match({
      $expr: {
        $in: ['$_id', '$temp.product_id']
      }
    })
    .project(PRODUCT_FORMAT)
    .pipeline()

module.exports = {
  getAdditionalProductsFieldByProductStages
}
