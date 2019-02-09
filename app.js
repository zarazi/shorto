const express = require('express')

const app = express()

// Index route
app.get('/', (req, res) => {
  res.send('Shorto ready!')
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Listening on :${PORT}`)
})
