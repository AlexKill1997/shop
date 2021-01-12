module.exports = string => {
  return string
    .replace("/", "\\/")
    .replace("(", "\\(")
    .replace(")", "\\)")
}