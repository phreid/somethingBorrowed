const Item = require('../models/Item')
const Request = require('../models/Request')

const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.sendStatus(401)
  }
  next()
}

const isUser = (req, res, next) => {
  const { userId } = req.params
  if (req.session.user !== userId) {
    return res.sendStatus(401)
  }
  next()
}

const isItemOwner = async (req, res, next) => {
  const { id } = req.params
  const item = await Item.findById(id).populate('owner')
  if (req.session.user !== item.owner._id.toString()) {
    return res.sendStatus(401)
  }
  next()
}

const canDeleteRequest = async (req, res, next) => {
  const { id } = req.params
  const request = await Request.findById(id).populate(['itemOwner', 'requestor'])
  if (!(req.session.user === request.itemOwner._id.toString() ||
        req.session.user === request.requestor._id.toString())) {
    return res.sendStatus(401)
  }
  next()
}

const isRequestOwner = async (req, res, next) => {
  const { id } = req.params
  const request = await Request.findById(id).populate('itemOwner')
  if (req.session.user !== request.itemOwner._id.toString()) {
    return res.sendStatus(401)
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
