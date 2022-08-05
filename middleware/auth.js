const { ApiError } = require('./error')
const Item = require('../models/Item')
const Request = require('../models/Request')

const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return next(new ApiError(401, 'You must be logged in.'))
  }
  next()
}

const isUser = (req, res, next) => {
  const { userId } = req.params
  if (req.session.user !== userId) {
    return next(new ApiError(403, 'You do not have permission for this user.'))
  }
  next()
}

const isItemOwner = async (req, res, next) => {
  const { id } = req.params
  const item = await Item.findById(id).populate('owner')
  if (req.session.user !== item.owner._id.toString()) {
    return next(new ApiError(403, 'You do not have permission for this item.'))
  }
  next()
}

const canDeleteRequest = async (req, res, next) => {
  const { id } = req.params
  const request = await Request.findById(id).populate(['itemOwner', 'requestor'])
  if (!(req.session.user === request.itemOwner._id.toString() ||
        req.session.user === request.requestor._id.toString())) {
    return next(new ApiError(403, 'You do not have permission for this request.'))
  }
  next()
}

const isRequestOwner = async (req, res, next) => {
  const { id } = req.params
  const request = await Request.findById(id).populate('itemOwner')
  if (req.session.user !== request.itemOwner._id.toString()) {
    return next(new ApiError(403, 'You do not have permission for this request.'))
  }
  next()
}

module.exports = {
  isLoggedIn,
  isUser,
  isItemOwner,
  canDeleteRequest,
  isRequestOwner
}
