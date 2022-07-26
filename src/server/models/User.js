const mongoose = require('mongoose')
const { LOCATIONS } = require('../../constants')

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

UserSchema.pre('findOneAndDelete', async function (next) {
  await mongoose.model('Item').deleteMany({ owner: this.getQuery()._id })
  next()
})

module.exports = mongoose.model('User', UserSchema)
