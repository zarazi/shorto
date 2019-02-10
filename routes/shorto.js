const { Router } = require('express')
const Url = require('../models/Url')

module.exports = (router = new Router()) => {
  router.get('/shorto', (req, res) => {
    res.status(200).json({
      shortUrl: '1234'
    })
  })

  router.post('/shorto', (req, res) => {
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
      const newUrl = {
        originalUrl,
        shortId: 'PPBqWA9',
        ...(!!alias && { alias })
      }
      new Url(newUrl).save().then(url => {
        res.redirect(`/shorto/${url.shortId}`)
      })
    }
  })

  router.get('/shorto/:shortId', async (req, res) => {
    const { shortId } = req.params
    const url = await Url.findOne({ shortId })
    if (url) {
      const { originalUrl } = url
      const shortUrl = `http://localhost/${shortId}`
      const data = {
        originalUrl,
        shortUrl
      }
      console.log(data)
      res.render('shorto', data)
    } else {
      res.status(403).send('Short url not found')
    }
  })

  return router
}
