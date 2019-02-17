const validator = require('validator')

const validateOriginalUrl = async url => {
  if (!url)
    throw new Error('Undefined original url')
  else if (!validator.isURL(url, { require_protocol: true })) {
    throw new Error('Original url is invalid')
  }

  return true
}

module.exports = {
  validateOriginalUrl
}