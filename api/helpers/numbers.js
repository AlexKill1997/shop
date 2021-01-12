module.exports.getSixNumberString = (number) => {
  let str = `${number}`
  while (str.length < 6) {
    let arr = (str = str.split(''))
    arr.unshift('0')
    str = arr.join('')
  }
  return str
}
