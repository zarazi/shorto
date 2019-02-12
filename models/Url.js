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

// UrlSchema.pre('findOne', next => {
//   next(new Error('Mongo - pre findOne error'))
// })

// UrlSchema.pre('findOneAndUpdate', next => {
//   next(new Error('Mongo - pre findOneAndUpdate error'))
// })

// UrlSchema.pre('save', next => {
//   next(new Error('Mongo - pre save error'))
// })

const Url = mongoose.model('urls', UrlSchema)

module.exports = Url
