const { Router } = require('express')

module.exports = (router = new Router()) => {
  router.get('/', (req, res) => {
    const title = 'Shorto!'
    res.render('index', { title })
  })

  return router
}
