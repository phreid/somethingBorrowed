const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  username: String,
  password: String,
  email: String,
  location: {
    type: String,
    enum: ['UBC Campus']
  }
})

module.exports = mongoose.model('User', UserSchema)
