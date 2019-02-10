const { Router } = require('express')
const Url = require('../models/Url')
const { generateShortId, absoluteUrl } = require('../lib/helpers')
const { BASEURL, PORT } = require('../config')

module.exports = (router = new Router()) => {
  router.get('/shorto', (req, res) => {
    res.status(200).json({
      shortUrl: '1234'
    })
  })

  router.post('/shorto', async (req, res) => {
    let errors = []

    const { body = {} } = req
    const { originalUrl, alias } = body
    if (!originalUrl) {
      errors.push({ text: 'Please add original url' })
    }

    // TODO: validate valid url
    // TODO: validate alias

    if (errors.length > 0) {
      res.render('index', {
        errors,
        originalUrl,
        alias
      })
    } else {
      const oldUrl = await Url.findOne({ originalUrl })
      let { shortId } = oldUrl || {}
      if (!shortId) {
        shortId = generateShortId()
        const newUrl = new Url({
          originalUrl,
          shortId,
          ...(!!alias && { alias })
        })
        await newUrl.save()
      }
      const shortUrl = `/shorto/${shortId}`
      res.redirect(shortUrl)
    }
  })

  router.get('/shorto/:shortId', async (req, res) => {
    const { shortId } = req.params
    const url = await Url.findOne({ shortId })
    if (url) {
      const { originalUrl } = url
      const shortUrl = absoluteUrl(BASEURL, null, shortId)
      const data = {
        originalUrl,
        shortUrl
      }
      res.render('shorto', data)
    } else {
      res.status(403).send('Short url not found')
    }
  })

  return router
}
