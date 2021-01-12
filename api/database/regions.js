const { connect, getModel } = require("./index")
const DBManager = require("./index")
const regions = require("../data/regions")
const { Schema, Types } = require("mongoose")

DBManager.create()


function getRandom(max, array) {
  return Math.ceil(Math.random() * max)
}
connect(async () => {
  await getModel("regions").deleteMany()

  const categories = await getModel("categories").find({}).select("-subcategories")

  const randomArray = []
  
  categories.forEach((cat, index) => {
    const random = Math.floor(Math.random() * (regions.length))
    if(!randomArray[random]) randomArray[random] = []
    randomArray[random].push(
      cat._id
    )
  })
  let count = 0;
  randomArray.forEach(item => {
    count += item.length
  })

  randomArray.forEach((a, index) => {
    regions[index].categories = a
  })

  regions.forEach(async r => {
    await getModel('regions').create({
      title: r.title,
      value: r.value,
      categories: r.value === 'moscow' ? categories.map(cat => cat._id) : r.categories
    })
  })
})

