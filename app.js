const express = require('express')
const index = require('./routes/index')

const app = express()

// Adding route
app.use(index())

// Starting server
const PORT = process.env.PORT ||  5000
app.listen(PORT, () => {
  console.log(`Listening on :${PORT}`)
})

