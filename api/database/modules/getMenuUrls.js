module.exports = (menuRoutes, region) => {
  const url = `/catalog/region/${region}/category`
  menuRoutes.forEach(item => {
    item.url = `${url}/${item.cSlug}`
    item.children.forEach(sItem => {
      sItem.url = `${item.url}/${sItem.cSlug}`
      sItem.children.forEach(gItem => {
        gItem.url = `${sItem.url}/${gItem.cSlug}`
      })
    })
  })
}