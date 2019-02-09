const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UrlSchema = new Schema({
  fullUrl: {
    type: String,
    required: true
  },
  shortId: {
    type: String,
    required: true
  },
  alias: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('urls', UrlSchema)
