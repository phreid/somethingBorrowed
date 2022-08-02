const express = require('express')
const multer = require('multer')

const { STATUS } = require('../constants')
const { isLoggedIn, isItemOwner } = require('../middleware')
const Item = require('../models/Item')
const User = require('../models/User')
const { cloudinaryStorage } = require('../cloudinary')

const router = express.Router()
const upload = multer({ storage: cloudinaryStorage })

/**
 * GET /items
 *
 * Retrieves a list of items. Pass optional query parameters to search
 * or filter the list:
 *
 * search: search for a term in the item name
 * type: filter by item type
 * rating: filter by item rating
 * status: filter by item status
 * location: filter by location
 *
 * @returns a list of item objects
 */
router.get('/', async (req, res) => {
  const { search, type, rating, status, location } = req.query

  const usersInLocation = location ? (await User.find({ location })).map((user) => user._id) : undefined
  const query = {
    ...(search ? { $or: [{ name: { $regex: new RegExp('^' + search, 'i') } }, { name: { $regex: new RegExp(' ' + search, 'i') } }] } : {}),
    ...(type ? { type } : {}),
    ...(rating ? { rating: { $regex: '^' + rating } } : {}),
    ...(status ? { status } : {}),
    ...(location ? { owner: { $in: usersInLocation } } : {})
  }

  const items = await Item.find(query).populate('owner')
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
router.post('/', upload.single('image'), isLoggedIn, async (req, res) => {
  const newItem = new Item({
    ...req.body,
    owner: req.session.user,
    image: req.file
      ? { url: req.file.path, filename: req.file.filename }
      : undefined
  })
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
  const item = await Item.findById(itemId)
  const newNumberOfTimesBorrowed = item.numberOfTimesBorrowed + 1
  const userId = req.session.user
  const borrowed = await Item.findByIdAndUpdate(itemId, { status: STATUS.BORROWED, numberOfTimesBorrowed: newNumberOfTimesBorrowed }, { new: true }).populate('owner')
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

  const item = await Item.findById(id)

  let rating

  if (item.rating === 'Unrated') {
    rating = req.body.rating
  } else {
    const currRating = parseInt(item.rating)
    const newRatingInput = parseInt(req.body.rating)
    const newRating = ((currRating + newRatingInput) / 2)
    rating = (Math.round(newRating * 10) / 10).toString()
  }

  const rated = await Item.findByIdAndUpdate(
    id,
    {
      rating,
      ratingComments: req.body.ratingComments
    }, { new: true }).populate('owner')

  res.send({
    result: rated
  })
})

module.exports = router
