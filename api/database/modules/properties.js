module.exports = (array, excludedItems) => {
  const propRanges = {}
    // цикл по продуктам
  
  array.forEach(item => {
    const properties = item.options
    // цикл по объекту properties у каждого продукта
    properties.forEach(prop => {
      const propertyKey = Object.keys(prop)[0]
  
      let verify = true;
      if (excludedItems) {
        excludedItems.forEach(exclude => {
          for (let k in prop) {
            if (k.toLowerCase() === exclude.toLowerCase()) verify = false
          }
        })
      }
      // первое обьявление объекта фильтра
      // присваиваем конкретный объект property переменной
      if (!verify) return
      
      const property = properties.find(f => f[propertyKey] !== undefined)

      switch (property.constructor) {
        case Object:
          for (let k in property) {
            const v = property[k]
            if (!propRanges[k]) propRanges[k] = []
            if (!propRanges[k].includes(v)) propRanges[k].push(v)
          }
        // if (!('min' in propRanges[propertyKey])) {
        //   propRanges[propertyKey].min = property.value
        // } else if (+property.value < propRanges[propertyKey].min) {
        //   propRanges[propertyKey].min = property.value
        // }

        // if (!('max' in propRanges[propertyKey])) {
        //   propRanges[propertyKey].max = property.value
        // } else if (+property.value > propRanges[propertyKey].max) {
        //   propRanges[propertyKey].max = property.value
        // }
        // propRanges[propertyKey].unit = property.unit
        // break;

        //   case Array:
        //     if (!propRanges[propertyKey]) propRanges[propertyKey] = []
        //     if (propRanges[propertyKey].constructor === Object) break;
        //     property.forEach(propertyItem => {
        //       if (propRanges[propertyKey].indexOf(propertyItem) === -1) propRanges[propertyKey].push(propertyItem)
        //     })
        //     break;
        //   case String:
        //     if(!propRanges[propertyKey]) propRanges[propertyKey] = []
        //     if (propRanges[propertyKey].constructor === Object) break;
        //     if (propRanges[propertyKey].indexOf(property) === -1) propRanges[propertyKey].push(property)
        //     break;
      }
    })
  })

  return propRanges
}
