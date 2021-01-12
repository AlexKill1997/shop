module.exports.requireUncached = function requireUncached(module) {
  delete require.cache[require.resolve(module)]
  return require(module)
}