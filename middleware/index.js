const Item = require('../models/Item')

const isLoggedIn = (req, res, next) => {
  if (!req.session.user) { return res.sendStatus(401) }
  next()
}

const isUser = (req, res, next) => {
  const { userId } = req.params
  if (req.session.user !== userId) { return res.sendStatus(401) }
  next()
}

const isItemOwner = async (req, res, next) => {
  const { id } = req.params
  const item = await Item.findById(id).populate('owner')
  if (req.session.user !== item.owner._id.toString()) { return res.sendStatus(401) }
  next()
}

module.exports = {
  isLoggedIn,
  isUser,
  isItemOwner
}
