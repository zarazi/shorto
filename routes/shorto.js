const { Router } = require('express')
const Url = require('../models/Url')
const { generateShortId, absoluteUrl } = require('../lib/helpers')
const { SHORTO_BASEURL, API_BASEURL, PORT } = require('../config')
const validator = require('validator')
const axios = require('axios')

module.exports = (router = new Router()) => {
  router.post('/shorto', async (req, res) => {
    let errors = []

    const { body = {} } = req
    const { originalUrl, alias } = body

    // Validate originalUrl presence
    if (!originalUrl) {
      errors.push({ text: 'Please add original url' })
    } else {
      // Validate originalUrl format
      if (!validator.isURL(originalUrl, { require_protocol: true })) {
        errors.push({ text: 'Original url is invalid' })
      }
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

    // Re-render form with errors
    if (errors.length > 0) {
      res.render('index', {
        errors,
        originalUrl,
        alias
      })
    } else {
      // Process input
      const oldUrl = await Url.findOne({ originalUrl })
      let { shortId } = oldUrl || {}

      // originalUrl is a new one
      if (!oldUrl) {
        // Create shortId
        const newIdUrl = absoluteUrl(API_BASEURL, null, '/api/new-id')
        const { data } = await axios.get(newIdUrl)
        const { id } = data
        shortId = id

        // Create new url
        const newUrl = new Url({
          originalUrl,
          shortId,
          ...(!!alias && { alias })
        })
        await newUrl.save()
      } else {
        // Update old url with alias, if any
        if (alias) {
          await Url.findOneAndUpdate({ originalUrl }, { alias }, { runValidators: true })
        }
      }

      // Showing generated one
      const shortUrl = `/shorto/${shortId}`
      res.redirect(shortUrl)
    }
  })

  router.get('/shorto/:shortId', async (req, res) => {
    const { shortId } = req.params
    const url = await Url.findOne({ shortId })
    if (url) {
      const { originalUrl, alias } = url
      const shortUrl = absoluteUrl(SHORTO_BASEURL, null, alias || shortId)
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
