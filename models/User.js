const mongoose = require('mongoose')
const { LOCATIONS } = require('../constants')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  bio: String,
  location: {
    type: String,
    enum: Object.values(LOCATIONS)
  },
  borrowedItems: [{ _id: false, item: { type: Schema.Types.ObjectId, ref: 'Item' }, date: Date }]
})

/**
 * This middleware does two things when a User is deleted:
 *  1. Deletes the users owned items
 *  2. Deletes any requests made by the user
 */
UserSchema.pre('findOneAndDelete', async function (next) {
  const userId = this.getQuery()._id
  await mongoose.model('Item').deleteMany({ owner: userId })
  await mongoose.model('Request').deleteMany({ requestor: userId })
  next()
})

module.exports = mongoose.model('User', UserSchema)
