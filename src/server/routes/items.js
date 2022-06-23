const express = require('express')
const nanoid = require('nanoid')
const { isLoggedIn, isItemOwner } = require('../middleware')

const { items, users } = require('../dev-data')

const router = express.Router()

const ID_LENGTH = 9
const id = () => nanoid.nanoid(ID_LENGTH)

/**
 * GET /items
 *
 * Retrieves all items.
 *
 * @returns a list of item objects
 */
router.get('/', (req, res) => {
  const itemsWithLocation = items.map((item) => {
    const ownerId = item.owner
    const owner = users.find((user) => user.id === ownerId)
    return { ...item, location: owner.location }
  })
  res.send({
    data: itemsWithLocation
  })
})

/**
 * GET /items/:id
 *
 * Retrieves a single item.
 *
 * @param id: the item id to retrieve
 * @returns a single item object
 */
router.get('/:id', (req, res) => {
  const { id } = req.params
  const item = items.find((item) => item.id === id)
  res.send({
    data: item
  })
})

/**
 * POST /items
 *
 * Creates a new item and adds it to the collection.
 * Requires the sender to be logged in.
 *
 * Request body: an item object
 *
 * @returns the newly created item object
 */
router.post('/', isLoggedIn, (req, res) => {
  const owner = users.find((user) => user.username === req.session.user)
  const newItem = { id: id(), owner: owner.id, ...req.body }
  items.push(newItem)
  res.send({
    data: newItem
  })
})

/**
 * DELETE /items/:id
 *
 * Removes an item from the collection. Requires the sender to be logged in as
 * the owner of the item being deleted.
 *
 * @param id: the item id to delete
 * @returns the deleted item object
 */
router.delete('/:id', isLoggedIn, isItemOwner, (req, res) => {
  const { id } = req.params
  const idx = items.findIndex((item) => item.id === id)
  const [deleted] = items.splice(idx, 1)
  res.send({
    data: deleted
  })
})

/**
 * PATCH /items/:id
 *
 * Updates an item's fields. Requires the sender to be logged in as the
 * owner of the item being updated.
 *
 * Request body: an object with the updated item fields
 *
 * @param id: the item id to update
 * @returns the updated item object
 */
router.patch('/:id', isLoggedIn, isItemOwner, (req, res) => {
  const { id } = req.params
  const idx = items.findIndex((item) => item.id === id)
  items[idx] = { ...items[idx], ...req.body }
  res.send({
    data: items[idx]
  })
})

module.exports = router
