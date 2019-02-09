const express = require('express')
const mongoose = require('mongoose')

const index = require('./routes/index')
const shorto = require('./routes/shorto')

const app = express()

// Connecting to mongo
mongoose
  .connect('mongodb://localhost/shorto-dev', { useNewUrlParser: true })
  .then(_ => console.log('MongoDB connected.'))
  .catch(err => console.log(err))

// Adding route
app.use(index())
app.use(shorto())

// Starting server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening on :${PORT}`)
})
