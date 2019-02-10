const shortid = require('shortid')

const generateShortId = _ => {
  shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
  return shortid.generate()
}

module.exports = {
  generateShortId
}