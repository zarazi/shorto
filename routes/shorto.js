const mongoose = require('mongoose')
const Url = require('../models/Url')

const { Router } = require('express')

module.exports = (router = new Router())=>{
  router.get('/shorto', (req, res) => {
    res.status(200).json({
      shortUrl: '1234'
    })
  })

  return router
}