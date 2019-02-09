const mongoose = require('mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const shorto = require('./routes/shorto')

// Connecting to mongo
mongoose
  .connect('mongodb://localhost/shorto-dev', { useNewUrlParser: true })
  .then(_ => console.log('MongoDB connected.'))
  .catch(err => console.log(err))

// Create express app
const app = express()

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Adding routes
app.use(index())
app.use(shorto())

// Starting server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening on :${PORT}`)
})
