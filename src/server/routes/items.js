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
    result: itemsWithLocation
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
    result: item
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
    result: newItem
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
    result: deleted
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
    result: items[idx]
  })
})

/**
 * POST /items/:id/borrow
 *
 * Sets an items status to borrowed. Requires the sender to be logged in.
 *
 * Request body: { borrower: _username }
 *
 * @param id: the item id to borrow
 * @return the updated item
 */
router.post('/:id/borrow', isLoggedIn, (req, res) => {
  const { id } = req.params
  const idx = items.findIndex((item) => item.id === id)
  items[idx] = { ...items[idx], status: 'Borrowed' }
  res.send({
    result: items[idx]
  })
})

module.exports = router
