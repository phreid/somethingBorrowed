const mongoose = require('mongoose')
const { ITEM_TYPES, STATUS } = require('../../constants')

const Schema = mongoose.Schema

const ItemSchema = new mongoose.Schema({
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
  }
})

module.exports = mongoose.model('Item', ItemSchema)
