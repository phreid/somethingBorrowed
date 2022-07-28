const express = require('express')

const { isLoggedIn, isUser } = require('../middleware')
const User = require('../models/User')
const Item = require('../models/Item')

const router = express.Router()

/**
 * GET /users
 *
 * Retrieves all users.
 *
 * @returns a list of user objects
 */
router.get('/', async (req, res) => {
  const users = await User.find()
  res.send({
    result: users
  })
})

/**
 * GET /users/:userId
 *
 * Retrieves a single user.
 *
 * @param userId: the user id of the user to retrieve
 * @returns a user object
 */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params
  const user = await User.findById(userId)
  res.send({
    result: user
  })
})

/**
 * GET /users/:userId/marketplace
 *
 * Retrieves the items in a single user's marketplace - all items, except for
 * those owned by the user. Requires the sender to be logged in as the requested
 * user.
 *
 * @param userId: the user id of the user's marketplace to retrieve
 * @returns a list of item objects
 */
router.get('/:userId/marketplace', isLoggedIn, isUser, async (req, res) => {
  const { userId } = req.params
  const items = await Item.find({ owner: { $ne: userId } })
  res.send({
    result: items
  })
})

/**
 * GET /users/:userId/history
 *
 * Retrieves a user's item borrowing history. Requires the sender to be logged in as the
 * requested user.
 *
 * @param userId: the user id of the user's history to retrieve
 * @returns a list of borrowing records containing item objects and the date the item
 *          was borrowed
 */
router.get('/:userId/history', isLoggedIn, isUser, async (req, res) => {
  const { userId } = req.params
  const user = await User
    .findById(userId)
    .populate({
      path: 'borrowedItems',
      populate: { path: 'item', populate: 'owner' }
    })

  res.send({
    result: user.borrowedItems
  })
})

/**
 * GET /users/:userId/items
 *
 * Retrieves the items owned by a single user.
 *
 * @param userId: the userId of the user whose items to retrieve
 * @returns a list of item objects
 */
router.get('/:userId/items', async (req, res) => {
  const { userId } = req.params
  const ownedItems = await Item.find({ owner: userId })
  res.send({
    result: ownedItems
  })
})

/**
 * POST /users
 *
 * Create a new user. Requires the new user's username to be unique.
 *
 * Request body:
 *
 * {
 *    'username': _,
 *    'password': _,
 *    'email': _
 * }
 *
 * @returns if successful, returns the new user object
 */
router.post('/', async (req, res) => {
  const existingUser = await User.findOne({ username: req.body.username })
  if (existingUser) { return res.sendStatus(403) }

  const newUser = new User({ ...req.body })
  await newUser.save()
  res.send({
    result: newUser
  })
})

/**
 * DELETE /users/:userId
 *
 * Deletes a user and all of the user's owned items. Requires the sender to be logged in
 * as the requested user.
 *
 * @param userId: the userId to delete
 * @returns the deleted user object
 */
router.delete('/:userId', isLoggedIn, isUser, async (req, res) => {
  const { userId } = req.params
  const deleted = await User.findByIdAndDelete(userId)
  res.send({
    result: deleted
  })
})

/**
 * PATCH /users/:userId
 *
 * Updates a user. Requires the sender to be logged in as the requested user.
 *
 * Request body: an object with the updated user fields
 *
 * @param userId: the user id to update
 * @returns the updated user object
 */
router.patch('/:userId', isLoggedIn, isUser, async (req, res) => {
  const { userId } = req.params
  const updated = await User.findByIdAndUpdate(userId, req.body, { new: true })
  res.send({
    result: updated
  })
})

module.exports = router
