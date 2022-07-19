const mongoose = require('mongoose')
const { ITEM_TYPES, STATUS } = require('../../constants')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: Object.values(ITEM_TYPES)
  },
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: Object.values(STATUS)
  },
  rating: {
    type: String,
    enum: ['Unrated', '1', '2', '3', '4', '5'],
    default: 'Unrated'
  },
  ratingComments: String
})

ItemSchema.pre('findOneAndDelete', async function (next) {
  const itemId = this.getQuery()._id
  await mongoose.model('User').updateMany(
    { 'borrowedItems.item': itemId },
    { $pull: { borrowedItems: { item: itemId } } }
  )
  next()
})

ItemSchema.pre('deleteMany', async function (next) {
  const toBeDeleted = (await mongoose.model('Item').find(this.getQuery())).map((doc) => doc._id)
  await mongoose.model('User').updateMany(
    { 'borrowedItems.item': { $in: toBeDeleted } },
    { $pull: { borrowedItems: { item: { $in: toBeDeleted } } } }
  )
  next()
})

module.exports = mongoose.model('Item', ItemSchema)
