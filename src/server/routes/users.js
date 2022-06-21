const express = require('express')
const nanoid = require('nanoid')

const { items, users } = require('../dev-data')
const { isLoggedIn, isUser } = require('../middleware')

const router = express.Router()

const ID_LENGTH = 9
const id = () => nanoid.nanoid(ID_LENGTH)

/**
 * GET /users
 *
 * Retrieves all users.
 *
 * @returns a list of user objects
 */
router.get('/', (req, res) => {
  res.send(users)
})

/**
 * GET /users/:username
 *
 * Retrieves a single user.
 *
 * @param username: the username of the user to retrieve
 * @returns a user object
 */
router.get('/:username', (req, res) => {
  const { username } = req.params
  const user = users.find((user) => user.username === username)
  res.send(user)
})

/**
 * GET /users/:username/marketplace
 *
 * Retrieves the items in a single user's marketplace - all items, except for
 * those owned by the user. Requires the sender to be logged in as the requested
 * user.
 *
 * @param username: the username of the user's marketplace to retrieve
 * @returns a list of item objects
 */
router.get('/:username/marketplace', isLoggedIn, isUser, (req, res) => {
  const { username } = req.params
  const user = users.find((user) => user.username === username)
  const marketplaceItems = items.filter((item) => item.owner !== user.id)
  const itemsWithLocation = marketplaceItems.map((item) => {
    const ownerId = item.owner
    const owner = users.find((user) => user.id === ownerId)
    return { ...item, location: owner.location }
  })
  res.send(itemsWithLocation)
})

/**
 * GET /users/:username/items
 *
 * Retrieves the items owned by a single user.
 *
 * @param username: the username of the user whose items to retrieve
 * @returns a list of item objects
 */
router.get('/:username/items', (req, res) => {
  const { username } = req.params
  const user = users.find((user) => user.username === username)
  const ownedItems = items.filter((item) => item.owner === user.id)
  res.send(ownedItems)
})

/**
 * POST /users
 *
 * Create a new user and add it to the collection.
 *
 * Request body: a user object
 *
 * @returns the new user object
 */
router.post('/', (req, res) => {
  const newUser = { id: id(), ...req.body }
  users.push(newUser)
  res.send(newUser)
})

/**
 * DELETE /users/:username
 *
 * Deletes a user. Requires the sender to be logged in as the requested user.
 *
 * @param username: the username to delete
 * @returns the deleted user object
 */
router.delete('/:username', isLoggedIn, isUser, (req, res) => {
  const { username } = req.params
  const idx = users.findIndex((user) => user.username === username)
  const [deleted] = users.splice(idx, 1)
  res.send(deleted)
})

/**
 * PATCH /users/:username
 *
 * Updates a user. Requires the sender to be logged in as the requested user.
 *
 * Request body: an object with the updated user fields
 *
 * @param username: the username to update
 * @returns the updated user object
 */
router.patch('/:username', isLoggedIn, isUser, (req, res) => {
  const { username } = req.params
  const idx = users.findIndex((user) => user.username === username)
  users[idx] = { ...users[idx], ...req.body }
  res.send(users[idx])
})

module.exports = router
