const { Router } = require('express')
const shortid = require('shortid')

module.exports = (router = new Router()) => {
  router.get('/api/new-id', (req, res) => {
    const id = shortid.generate()
    res.status(200).send({ id })
  })

  return router
}
