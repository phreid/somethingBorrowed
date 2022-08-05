const express = require('express')

const { isLoggedIn, isUser } = require('../middleware/auth')
const { catchError, ApiError } = require('../middleware/error')
const User = require('../models/User')

const router = express.Router()

/**
 * GET /users
 *
 * Retrieves all users.
 *
 * @returns a list of user objects
 */
router.get('/', catchError(async (req, res) => {
  const users = await User.find()
  res.send({
    result: users
  })
}))

/**
 * GET /users/:userId
 *
 * Retrieves a single user.
 *
 * @param userId: the user id of the user to retrieve
 * @returns a user object
 */
router.get('/:userId', catchError(async (req, res) => {
  const { userId } = req.params
  const user = await User.findById(userId)

  if (!user) {
    throw new ApiError(404, 'User not found.')
  }

  res.send({
    result: user
  })
}))

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
router.get('/:userId/history', isLoggedIn, isUser, catchError(async (req, res) => {
  const { userId } = req.params
  const user = await User
    .findById(userId)
    .populate({
      path: 'borrowedItems',
      populate: { path: 'item', populate: 'owner' }
    })

  if (!user) {
    throw new ApiError(404, 'User not found.')
  }

  res.send({
    result: user.borrowedItems
  })
}))

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
router.post('/', catchError(async (req, res) => {
  const existingUser = await User.findOne({ username: req.body.username })
  if (existingUser) {
    throw new ApiError(403, 'User already registered.')
  }

  const newUser = new User({ ...req.body })
  await newUser.save()
  res.send({
    result: newUser
  })
}))

/**
 * DELETE /users/:userId
 *
 * Deletes a user and all of the user's owned items. Requires the sender to be logged in
 * as the requested user.
 *
 * @param userId: the userId to delete
 * @returns the deleted user object
 */
router.delete('/:userId', isLoggedIn, isUser, catchError(async (req, res) => {
  const { userId } = req.params
  const deleted = await User.findByIdAndDelete(userId)

  if (!deleted) {
    throw new ApiError(404, 'User not found')
  }

  res.send({
    result: deleted
  })
}))

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
router.patch('/:userId', isLoggedIn, isUser, catchError(async (req, res) => {
  const { userId } = req.params
  const updated = await User.findByIdAndUpdate(userId, req.body, { new: true })

  if (!updated) {
    throw new ApiError(404, 'User not found.')
  }

  res.send({
    result: updated
  })
}))

module.exports = router
