const mongoose = require('mongoose')

const { REQUEST_STATUS } = require('../constants')

const Schema = mongoose.Schema

const RequestSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: 'Item' },
  itemOwner: { type: Schema.Types.ObjectId, ref: 'User' },
  requestor: { type: Schema.Types.ObjectId, ref: 'User' },
  reqestorNotes: String,
  daysNeededFor: Number,
  dateNeededOn: String,
  status: {
    type: String,
    enum: Object.values(REQUEST_STATUS),
    default: REQUEST_STATUS.PENDING
  }
})

module.exports = mongoose.model('Request', RequestSchema)
