const mongoose = require('mongoose')
const { LOCATIONS } = require('../../constants')

const Schema = mongoose.Schema

const UserSchema = Schema({
  username: String,
  password: String,
  email: String,
  bio: String,
  location: {
    type: String,
    enum: Object.values(LOCATIONS)
  }
})

module.exports = mongoose.model('User', UserSchema)
