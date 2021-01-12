const { getChildrenBrandStages, getChildrenCategoryStages, getMenuChildrenCategoryStages, getMenuChildrenBrandStages } = require("../stages/categories")

const childrenCategoryLookup = region => ({
  $lookup: {
    from: 'categories',
    let: { parent_id: '$_id' },
    pipeline: [
      ...getChildrenCategoryStages(region),
    ],
    as: 'subcategories'
  }
})

const childrenBrandLookup = region => ({
  $lookup: {
    from: "brands",
    let: { parent_id: "$_id" },
    pipeline: [
      ...getChildrenBrandStages(region),
    ],
    as: 'brands'
  }
})

const menuChildrenCategoryLookup = region => ({
  $lookup: {
    from: 'categories',
    let: { parent_id: '$_id' },
    pipeline: [
      ...getMenuChildrenCategoryStages(region),
    ],
    as: 'subcategories'
  }
})

const menuChildrenBrandLookup = region => ({
  $lookup: {
    from: "brands",
    let: { parent_id: "$_id" },
    pipeline: [
      ...getMenuChildrenBrandStages(region),
    ],
    as: 'brands'
  }
})

module.exports = {
  menuChildrenBrandLookup,
  childrenBrandLookup,
  //
  menuChildrenCategoryLookup,
  childrenCategoryLookup
}