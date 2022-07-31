const express = require('express')

const Request = require('../models/Request')

const router = express.Router()

/**
 * GET /requests
 *
 * Retrieves all requests.
 *
 * @returns a list of requests
 */
router.get('/', async (req, res) => {
  const requests = await Request.find()
  res.send({
    result: requests
  })
})

module.exports = router
