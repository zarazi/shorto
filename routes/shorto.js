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
    const { originalUrl, shortName } = body
    if (!originalUrl) {
      errors.push({ text: 'Please add original url' })
    }

    if (errors.length > 0) {
      res.render('index', {
        errors,
        originalUrl,
        shortName
      })
    } else {
      res.send('ok')
    }
  })

  return router
}
