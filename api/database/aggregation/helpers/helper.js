const { Aggregate } = require('mongoose')

const getRegionItem = (region, key) =>
  new Aggregate()
    .project({
      temp: {
        $filter: {
          input: '$regions',
          as: 'region',
          cond: {
            $eq: ['$$region.region', region._id]
          }
        }
      }
    })
    .project({
      temp: {
        $cond: [
          { $gt: [{ $size: '$temp' }, 0] },
          { $arrayElemAt: ['$temp', 0] },
          { [key]: {} }
        ]
      }
    })
    .replaceRoot(`$$ROOT.temp.${key}`)
    .match({
      _id: {
        $exists: true
      }
    })
    .pipeline()

const getRegionItemByRegionID = (regionID, key) =>
  new Aggregate()
    .project({
      updatedAt: "$updatedAt",
      region: regionID,
      temp: {
        $filter: {
          input: '$regions',
          as: 'region',
          cond: {
            $eq: ['$$region.region', regionID]
          }
        }
      }
    })
    .project({
      temp: {
        $cond: [
          { $gt: [{ $size: '$temp' }, 0] },
          { $arrayElemAt: ['$temp', 0] },
          { [key]: {} }
        ]
      },
      region: "$region",
      updatedAt: "$updatedAt"
    })
    .replaceRoot({ $mergeObjects: [`$$ROOT.temp.${key}`, { region: "$region", updatedAt: "$updatedAt" }] })
    .match({
      _id: {
        $exists: true
      }
    })
    .pipeline()

const getItemByRegionID = (regionID, key) =>
  new Aggregate()
    .project({
      temp: {
        $filter: {
          input: '$regions',
          as: 'region',
          cond: {
            $eq: [`$$region.region`, regionID]
          }
        }
      }
    })
    .project({
      temp: {
        $cond: [
          { $gt: [{ $size: '$temp' }, 0] },
          { $arrayElemAt: ['$temp', 0] },
          { [key]: {} }
        ]
      },
    })
    .replaceRoot(`$$ROOT.temp.${key}`)
    .pipeline()

const ifNotChildren = () =>
  new Aggregate()
    .append({
      $set: {
        children: {
          $cond: [
            {
              $ifNull: '$children'
            },
            [],
            '$children'
          ]
        }
      }
    })
    .pipeline()

const getLastItem = () => 
  new Aggregate()
    .group({
      _id: null,
      count: {
        $sum: 1
      },
      tmpArray: {
        $push: "$$ROOT"
      }
    })
    .addFields({
      tmp: {
        $cond: [
          { $gt: ["$count", 0] },
          {
            $arrayElemAt: [
              "$tmpArray",
              { $subtract: ["$count", 1] }
            ]
          },
          {}
        ]
      }
    })
    .replaceRoot("$tmp")
    .pipeline()

module.exports = {
  getRegionItem,
  getRegionItemByRegionID,
  getItemByRegionID,
  getLastItem,
  ifNotChildren
}
