const { items, users } = require('../dev-data')

const isLoggedIn = (req, res, next) => {
  if (!req.session.user) { return res.sendStatus(401) }
  next()
}

const isUser = (req, res, next) => {
  const { username } = req.params
  if (req.session.user !== username) { return res.sendStatus(401) }
  next()
}

const isItemOwner = (req, res, next) => {
  const { id } = req.params
  const ownerId = items.find((item) => item.id === id).owner
  const ownerName = users.find((user) => user.id === ownerId).username

  if (req.session.user !== ownerName) { return res.sendStatus(401) }
  next()
}

module.exports = {
  isLoggedIn,
  isUser,
  isItemOwner
}
