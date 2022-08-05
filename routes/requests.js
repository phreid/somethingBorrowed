const express = require('express')

const Request = require('../models/Request')
const { isLoggedIn, canDeleteRequest, isRequestOwner } = require('../middleware/auth')
const { catchError, ApiError } = require('../middleware/error')
const { REQUEST_STATUS } = require('../constants')
const Item = require('../models/Item')
const User = require('../models/User')

const router = express.Router()

/**
 * GET /requests
 *
 * Retrieves all requests.
 *
 * @returns a list of requests
 */
router.get('/', catchError(async (req, res) => {
  const requests = await Request.find().populate(['item', 'itemOwner', 'requestor'])
  res.send({
    result: requests
  })
}))

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
router.post('/', isLoggedIn, catchError(async (req, res) => {
  const newRequest = new Request({
    ...req.body,
    requestor: req.session.user
  })

  const item = await Item.findById(newRequest.item)
  const itemOwner = await User.findById(newRequest.itemOwner)

  if (!(item && itemOwner)) {
    throw new ApiError(404, 'Request item or owner not found.')
  }

  await newRequest.save()
  const request = await newRequest.populate(['item', 'itemOwner', 'requestor'])

  res.send({
    result: request
  })
}))

/**
 * DELETE /requests/:id
 *
 * Removes an request from the collection. Requires the sender to be logged in as either
 * the item owner or requestor.
 *
 * @param id: the request id to delete
 * @returns the deleted request object
 */
router.delete('/:id', isLoggedIn, canDeleteRequest, catchError(async (req, res) => {
  const { id } = req.params

  const deleted = await Request.findByIdAndDelete(id).populate(['item', 'itemOwner', 'requestor'])

  if (!deleted) {
    throw new ApiError(404, 'Request not found.')
  }

  if (!deleted.item) {
    throw new ApiError(404, 'Item not found.')
  }

  if (!(deleted.itemOwner && deleted.requestor)) {
    throw new ApiError(404, 'User not found.')
  }

  res.send({
    result: deleted
  })
}))

/**
 * POST /requests/:id/accept
 *
 * Sets an items status to borrowed and adds it to the borrowed item history
 * of the currently logged in user. Requires the sender to be logged in as the owner
 * of the requested item.
 *
 * @param id: the request id to accept
 * @return the accepted request
 */
router.post('/:id/accept', isLoggedIn, isRequestOwner, catchError(async (req, res) => {
  const { id: itemId } = req.params

  const accepted = await Request.findByIdAndUpdate(itemId, { status: REQUEST_STATUS.ACCEPTED }, { new: true }).populate(['item', 'itemOwner', 'requestor'])
  await Request.deleteMany({ item: accepted.item._id, status: REQUEST_STATUS.PENDING })

  if (!accepted) {
    throw new ApiError(404, 'Request not found.')
  }

  if (!accepted.item) {
    throw new ApiError(404, 'Item not found.')
  }

  if (!(accepted.itemOwner && accepted.requestor)) {
    throw new ApiError(404, 'User not found.')
  }

  res.send({
    result: accepted
  })
}))

module.exports = router
