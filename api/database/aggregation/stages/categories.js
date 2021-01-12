const { getRegionItem } = require('../helpers/helper')
const { Aggregate } = require('mongoose')

const getMenuChildrenCategoryStages = (region) =>
  new Aggregate()
    .match({
      $expr: {
        $in: ['$$parent_id', '$regions.category.parent_id']
      },
      'regions.region': region._id
    })
    .append(getRegionItem(region, 'category'))
    .sort({
      order: 1
    })
    .pipeline()

const getChildrenCategoryStages = (region) =>
  new Aggregate()
    .match({
      $expr: {
        $in: ['$$parent_id', '$regions.category.parent_id']
      }
    })
    .append(getRegionItem(region, 'category'))
    .sort({
      order: 1
    })
    .pipeline()

const getChildrenNeighborsCategoryStages = (region) =>
  new Aggregate()
    .match({
      $expr: {
        $in: ['$$parent_id', '$regions.category.parent_id']
      }
    })
    .append(getRegionItem(region, 'category'))
    .sort({
      order: 1
    })
    .pipeline()

const getChildrenNeighborsBrandStages = (region) =>
  new Aggregate()
    .match({
      $expr: {
        $in: ['$$category_id', '$regions.brand.category_id']
      }
    })
    .append(getRegionItem(region, 'brand'))
    .sort({
      order: 1
    })
    .append({
      $set: {
        cSlug: '$slug',
        categoryName: '$name'
      }
    })
    .pipeline()

const getNeighborCategoryStages = (region) =>
  new Aggregate()
    .match({
      $expr: {
        $in: ['$$parent_id', '$regions.category.parent_id']
      }
    })
    .append(getRegionItem(region, 'category'))
    .sort({
      order: 1
    })
    .pipeline()

const getChildrenBrandStages = (region) =>
  new Aggregate()
    .match({
      $expr: {
        $in: ['$$parent_id', '$regions.brand.category_id']
      }
    })
    .append(getRegionItem(region, 'brand'))
    .sort({
      order: 1
    })
    .append({
      $set: {
        cSlug: '$slug',
        categoryName: '$name',
        category: '$$parent_id'
      }
    })
    .pipeline()

const getMenuChildrenBrandStages = (region) =>
  new Aggregate()
    .match({
      $expr: {
        $in: ['$$parent_id', '$regions.brand.category_id']
      },
      'regions.region': region._id
    })
    .append(getRegionItem(region, 'brand'))
    .append({
      $set: {
        category: '$$parent_id',
        categoryName: '$name',
        cSlug: '$slug',
        type: 'brand'
      }
    })
    .pipeline()

module.exports = {
  getMenuChildrenCategoryStages,
  getChildrenCategoryStages,
  getNeighborCategoryStages,
  getChildrenNeighborsCategoryStages,
  //
  getMenuChildrenBrandStages,
  getChildrenNeighborsBrandStages,
  getChildrenBrandStages
}
