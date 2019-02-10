const shortid = require('shortid')
const urlparse = require('url-parse')

const generateShortId = _ => {
  shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')
  return shortid.generate()
}

const absoluteUrl = (baseurl, port, pathname) => {
  const parsed = urlparse(baseurl)
  if (port) parsed.set('port', port)
  if (pathname) parsed.set('pathname', pathname)
  return parsed.href
}

module.exports = {
  generateShortId,
  absoluteUrl
}
