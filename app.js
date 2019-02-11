const mongoose = require('mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const shorto = require('./routes/shorto')
const redirector = require('./routes/redirector')
const api = require('./routes/api')
const { PORT, MONGO_URL } = require('./config')

// Connecting to mongo
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
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
app.use(redirector())
app.use(api())

// Starting server
app.listen(PORT, () => {
  console.log(`Listening on :${PORT}`)
})
