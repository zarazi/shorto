const { Router } = require('express')

module.exports = (router = new Router()) => {
  router.get('/', (req, res) => {
    res.render('index')
  })

  return router
}
