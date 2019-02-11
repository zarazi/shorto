const PORT = process.env.PORT || 5000
const API_BASEURL = process.env.API_BASEURL || `http://localhost:${PORT}`
const SHORTO_BASEURL = process.env.SHORTO_BASEURL || `http://localhost:${PORT}`
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/shorto-dev'

module.exports = {
  PORT,
  API_BASEURL,
  SHORTO_BASEURL,
  MONGO_URL
}