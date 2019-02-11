const { Router } = require('express')
const Url = require('../models/Url')

module.exports = (router = new Router()) => {
  router.get('/:shortId', async (req, res) => {
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
      res.status(403).send('Short url not found')
    }
  })

  return router
}
