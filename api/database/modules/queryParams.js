let excludeParams = ['page', 'limit', 'sort']

module.exports = object => {
  const newObj = {}
  const query = { $and: [{}] }
  const queryContainer = query.$and
  for (let key in object) {
    let result = true
    for(let param of excludeParams) {
      if(key == param) result = false
    }
    if(result) newObj[key] = object[key]
  }
  
  let tmpArr = []
  for (let key in newObj) {
    const filter = newObj[key]
    switch (filter.constructor) {
      // case String:
      //   tmpArr = filter.split("-")

      //   queryContainer.push({
      //     [`product.options.${key}.value`]: {
      //       $gte: +tmpArr[0],
      //       $lte: +tmpArr[1]
      //     }
      //   })
      //   break;
      case Array:
        tmpArr = []
        filter.forEach(filterItem => {
          tmpArr.push(filterItem)
        })
        // key = key.replace(/\./g, "\\u002e")
        // console.log(key)
        const filterObject = {
          // $or: [
            // {
              [`product.options.${key}`]: {
                $in: tmpArr
              }
            // },
            // {
            //   [`product.options.${key}`]: {
            //     $in: tmpArr
            //   }
            // }
          // ]
        }
        queryContainer.push(filterObject)
        break;
    }
  }

  return query
}