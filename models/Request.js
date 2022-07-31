const mongoose = require('mongoose')

const { REQUEST_STATUS } = require('../constants')

const Schema = mongoose.Schema

const RequestSchema = new Schema({
  itemName: { type: Schema.Types.ObjectId, ref: 'Item' },
  itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
  itemOwner: { type: Schema.Types.ObjectId, ref: 'User' },
  itemOwnerLocation: { type: Schema.Types.ObjectId, ref: 'User' },
  requestorName: { type: Schema.Types.ObjectId, ref: 'User' },
  requestorId: { type: Schema.Types.ObjectId, ref: 'User' },
  requestorEmail: { type: Schema.Types.ObjectId, ref: 'User' },
  requestorLocation: { type: Schema.Types.ObjectId, ref: 'User' },
  reqestorNotes: String,
  daysNeededFor: Number,
  dateNeededOn: String,
  status: {
    type: String,
    enum: Object.values(REQUEST_STATUS)
  }
})

module.exports = mongoose.model('Request', RequestSchema)
