const express = require('express')

const Request = require('../models/Request')
const { isLoggedIn } = require('../middleware')
const { REQUEST_STATUS } = require('../constants')

const router = express.Router()

/**
 * GET /requests
 *
 * Retrieves all requests.
 *
 * @returns a list of requests
 */
router.get('/', async (req, res) => {
  const requests = await Request.find().populate(['item', 'itemOwner', 'requestor'])
  res.send({
    result: requests
  })
})

/**
 * POST /requests
 *
 * Creates a new request and adds it to the collection.
 * Requires the sender to be logged in.
 *
 * Request body: an request object
 *
 * @returns the newly created request object
 */
router.post('/', isLoggedIn, async (req, res) => {
  const newRequest = new Request({
    ...req.body,
    requestor: req.session.user
  })
  await newRequest.save()
  const request = await newRequest.populate(['item', 'itemOwner', 'requestor'])
  res.send({
    result: request
  })
})

/**
 * DELETE /requests/:id
 *
 * Removes an request from the collection.
 *
 * @param id: the request id to delete
 * @returns the deleted request object
 */
router.delete('/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params

  const deleted = await Request.findByIdAndDelete(id).populate(['item', 'itemOwner', 'requestor'])

  res.send({
    result: deleted
  })
})

/**
 * DELETE /requests/:item
 *
 * Removes all requests for a item
 *
 * @param id: the request id to delete
 * @returns the deleted request object
 */
 router.delete('/:id/deleteRemaining', isLoggedIn, async (req, res) => {
  const { id: itemId } = req.params

  const deleted = await Request.deleteMany({ item: itemId, status: REQUEST_STATUS.PENDING })

  res.send({
    result: deleted
  })
})

/**
 * POST /requests/:id/accept
 *
 * Sets an items status to borrowed and adds it to the borrowed item history
 * of the currently logged in user. Requires the sender to be logged in.
 *
 * @param id: the item id to borrow
 * @return the updated item
 */
router.post('/:id/accept', isLoggedIn, async (req, res) => {
  const { id: itemId } = req.params

  const accepted = await Request.findByIdAndUpdate(itemId, { status: REQUEST_STATUS.ACCEPTED }, { new: true }).populate(['item', 'itemOwner', 'requestor'])

  res.send({
    result: accepted
  })
})

module.exports = router
