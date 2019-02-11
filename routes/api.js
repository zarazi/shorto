const { Router } = require('express')
const { generateShortId } = require('../lib/helpers')

module.exports = (router = new Router()) => {
  router.get('/api/new-id', (req, res) => {
    const id = generateShortId()
    res.status(200).send({ id })
  })

  return router
}
