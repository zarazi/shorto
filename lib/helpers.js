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

const wrapAsync = fn => {
  return function(req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next)
  }
}

module.exports = {
  generateShortId,
  absoluteUrl,
  wrapAsync
}
