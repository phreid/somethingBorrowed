const express = require('express')
const { STATUS } = require('../../constants')
const { isLoggedIn, isItemOwner } = require('../middleware')

const Item = require('../models/Item')
const User = require('../models/User')

const router = express.Router()

/**
 * GET /items
 *
 * Retrieves all items.
 *
 * @returns a list of item objects
 */
router.get('/', async (req, res) => {
  const items = await Item.find().populate('owner')
  res.send({
    result: items
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
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const item = await Item.findById(id).populate('owner')
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
router.post('/', isLoggedIn, async (req, res) => {
  const newItem = new Item({ owner: req.session.user, ...req.body })
  await newItem.save()
  const itemWithOwner = await newItem.populate('owner')
  res.send({
    result: itemWithOwner
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
router.delete('/:id', isLoggedIn, isItemOwner, async (req, res) => {
  const { id } = req.params
  const deleted = await Item.findByIdAndDelete(id).populate('owner')
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
router.patch('/:id', isLoggedIn, isItemOwner, async (req, res) => {
  const { id } = req.params
  const updated = await Item.findByIdAndUpdate(id, req.body, { new: true }).populate('owner')
  res.send({
    result: updated
  })
})

/**
 * POST /items/:id/borrow
 *
 * Sets an items status to borrowed and adds it to the borrowed item history
 * of the currently logged in user. Requires the sender to be logged in.
 *
 * @param id: the item id to borrow
 * @return the updated item
 */
router.post('/:id/borrow', isLoggedIn, async (req, res) => {
  const { id: itemId } = req.params
  const userId = req.session.user
  const borrowed = await Item.findByIdAndUpdate(itemId, { status: STATUS.BORROWED }, { new: true }).populate('owner')
  await User.findByIdAndUpdate(
    userId, { $push: { borrowedItems: { item: borrowed._id, date: new Date() } } }, { new: true }
  )
  res.send({
    result: borrowed
  })
})

/**
 * POST /items/:id/rating
 *
 * Sets an items rating and comments. Requires the sender to be logged in.
 *
 * @param id: the item id to borrow
 * @return the updated item
 */
router.post('/:id/rating', isLoggedIn, async (req, res) => {
  const { id } = req.params

  const rated = await Item.findByIdAndUpdate(id, { rating: req.body.rating, ratingComments: req.body.ratingComments }, { new: true }).populate('owner')

  res.send({
    result: rated
  })
})

/**
 * GET /items/searchText/:searchText
 *
 * Retrieves a single item.
 *
 * @param id: the item id to retrieve
 * @returns a single item object
 */
router.get('/search/:searchText', async (req, res) => {
  if (req.params.searchText !== undefined) {
    const searchText = req.params.searchText
    const items = await Item.find({ name: { $regex: new RegExp(searchText, 'i') } }).populate('owner')
    res.send({
      result: items
    })
  }
})
/**
 * GET /items/filter/:filters
 *
 * Filtering items with selected inputs.
 *
 * @param filters: the JSON object that contains the filters
 * @returns items
 */
router.get('/filter/:filters', async (req, res) => {
  const rate = JSON.parse(req.params.filters).rating
  const category = JSON.parse(req.params.filters).type
  if (req.params.filters !== undefined) {
    let items
    if (rate === undefined) {
      if (category === undefined) {
        items = await Item.find().populate('owner')
      } else {
        items = await Item.find({ type: category }).populate('owner')
      }
    } else if (category === undefined) {
      items = await Item.find({ rating: rate }).populate('owner')
    } else {
      items = await Item.find({ rating: rate, type: category }).populate('owner')
    }
    res.send({
      result: items
    })
  }
})

module.exports = router
