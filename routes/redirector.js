const { Router } = require('express')
const Url = require('../models/Url')

module.exports = (router = new Router()) => {
  router.get('/:shortId', async (req, res) => {
    const { shortId } = req.params
    const url = await Url.findOne({ shortId })
    if (url) {
      const { originalUrl } = url
      res.redirect(originalUrl)
    } else {
      res.status(403).send('Short url not found')
    }
  })

  return router
}
