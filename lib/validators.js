
const validateOriginalUrl = async url => {
  if (!url)
    throw new Error('Undefined originalUrl')
  else
    return true
}

module.exports = {
  validateOriginalUrl
}