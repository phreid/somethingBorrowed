const mongoose = require('mongoose')

const { cloudinary } = require('../cloudinary')
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
  // rating: [],
  ratingComments: String,
  image: {
    url: String,
    filename: String
  }
})

ItemSchema.pre('findOneAndDelete', async function (next) {
  const itemId = this.getQuery()._id

  const item = await mongoose.model('Item').findById(itemId).lean()
  if (item.image) {
    await cloudinary.uploader.destroy(item.image.filename)
  }

  await mongoose.model('User').updateMany(
    { 'borrowedItems.item': itemId },
    { $pull: { borrowedItems: { item: itemId } } }
  )
  next()
})

ItemSchema.pre('deleteMany', async function (next) {
  const toBeDeleted = await mongoose.model('Item').find(this.getQuery()).lean()
  for (const item of toBeDeleted) {
    if (item.image) {
      await cloudinary.uploader.destroy(item.image.filename)
    }
  }

  const ids = toBeDeleted.map((item) => item._id)
  await mongoose.model('User').updateMany(
    { 'borrowedItems.item': { $in: ids } },
    { $pull: { borrowedItems: { item: { $in: ids } } } }
  )
  next()
})

module.exports = mongoose.model('Item', ItemSchema)
