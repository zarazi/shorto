const { Router } = require('express')
const Url = require('../models/Url')
const { generateShortId, absoluteUrl } = require('../lib/helpers')
const { BASEURL, PORT } = require('../config')
const validUrl = require('valid-url')

module.exports = (router = new Router()) => {
  // TODO: remove this
  router.get('/shorto', (req, res) => {
    res.status(200).json({
      shortUrl: '1234'
    })
  })

  router.post('/shorto', async (req, res) => {
    let errors = []

    const { body = {} } = req
    const { originalUrl, alias } = body

    // Validate originalUrl presence
    if (!originalUrl) {
      errors.push({ text: 'Please add original url' })
    }

    // Validate originalUrl format
    if (!validUrl.isUri(originalUrl)) {
      errors.push({ text: 'Original url is invalid' })
    }

    // Validate alias format
    if (alias && !/^[0-9a-zA-Z]+$/.test(alias)) {
      errors.push({ text: 'Alias should contains only alphanumeric' })
    }
    if (alias && (alias.length < 3 || alias.length > 10)) {
      errors.push({ text: 'Alias should be 3 to 10 characters' })
    }

    // Validate alias usage
    const oldUrlWithNewAlias = await Url.findOne({ alias })
    if (oldUrlWithNewAlias) {
      errors.push({ text: 'Alias has already been used' })
    }

    // Validate prefer alias on existing url
    const oldUrl = await Url.findOne({ originalUrl })
    if (oldUrl && alias) {
      errors.push({ text: 'Can\'t set alias on existing url' })
    }

    // Re-render form with errors
    if (errors.length > 0) {
      res.render('index', {
        errors,
        originalUrl,
        alias
      })
    } else {
      // Process input
      let { shortId } = oldUrl || {}

      // originalUrl is a new one
      if (!oldUrl) {

        // Create new url
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
