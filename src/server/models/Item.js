const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['DIY', 'Outdoors', 'Tools', 'Kitchen']
  },
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['Available', 'Borrowed']
  }
})

module.exports = mongoose.model('Item', ItemSchema)
