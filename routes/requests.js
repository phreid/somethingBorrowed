const express = require('express')

const Request = require('../models/Request')
const { isLoggedIn } = require('../middleware')

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

module.exports = router
