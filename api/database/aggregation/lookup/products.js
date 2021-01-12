const { getAdditionalProductsFieldByProductStages } = require("../stages/products");

const getAdditionalProductsFieldByProduct = (region, fieldKey, asKey) => ([
  {
    $set: {
      [`${fieldKey}`]: {
        $ifNull: [`$${fieldKey}`, []]
      }
    }
  },
  {
    $lookup: {
      from: "products",
      let: {
        products_array_key: `$${fieldKey}`
      },
      pipeline: [
        ...getAdditionalProductsFieldByProductStages(region, fieldKey)
      ],
      as: asKey || fieldKey
    }
  }
])

module.exports = {
  getAdditionalProductsFieldByProduct
}