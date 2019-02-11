const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
    index: true
  },
  shortId: {
    type: String,
    required: true,
    index: true
  },
  alias: {
    type: String,
    index: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

const Url = mongoose.model('urls', UrlSchema)

module.exports = Url
