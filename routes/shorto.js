const mongoose = require('mongoose')
const Url = require('../models/Url')

const { Router } = require('express')

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
        alias
      }
      // TODO: save data to db
      res.status(200).json(newUrl)
      // TODO: render shorten url
    }
  })

  return router
}
