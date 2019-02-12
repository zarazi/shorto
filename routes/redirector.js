const { Router } = require('express')
const Url = require('../models/Url')
const { wrapAsync } = require('../lib/helpers')

module.exports = (router = new Router()) => {
  router.get(
    '/:shortId',
    wrapAsync(async (req, res) => {
      const { shortId } = req.params
      const selector = {
        $or: [
          { alias: { $exists: false }, shortId },
          { alias: { $exists: true }, alias: shortId }
        ]
      }
      const url = await Url.findOne(selector)
      if (url) {
        const { originalUrl } = url
        res.redirect(originalUrl)
      } else {
        res.status(403).send('Short url not found') // TODO: render error page
      }
    })
  )

  return router
}
