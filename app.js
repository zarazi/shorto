const express = require('express')
const index = require('./routes/index')
const shorto = require('./routes/shorto')

const app = express()

// Adding route
app.use(index())
app.use(shorto())

// Starting server
const PORT = process.env.PORT ||  5000
app.listen(PORT, () => {
  console.log(`Listening on :${PORT}`)
})

