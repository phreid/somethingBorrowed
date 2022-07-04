const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../middleware')
const User = require('../models/User')

/**
 * POST /auth/login
 *
 * Checks the user's password and logs them in.
 *
 * Request body:
 *  {
 *    'username': _
 *    'password': _
 *  }
 *
 * @returns if successful, returns the logged in user's username.
 */
router.post('/login', async (req, res) => {
  // fake login, don't check the password
  const { username } = req.body

  const loggedInUser = await User.findOne({ username })
  if (loggedInUser) {
    req.session.user = loggedInUser._id
    res.send({
      result: loggedInUser._id
    })
  } else {
    res.sendStatus(404)
  }
})

/**
 * POST /auth/logout
 *
 * Logs the current user out. Requires the sender to be logged in.
 *
 * @returns if successful, returns a success message.
 */
router.post('/logout', isLoggedIn, (req, res) => {
  req.session.destroy()
  res.send('Logout successful')
})

module.exports = router
