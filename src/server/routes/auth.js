const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('../middleware')
const { users } = require('../dev-data')

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
router.post('/login', (req, res) => {
  // fake login, don't check the password
  const { username } = req.body

  const loggedInUser = users.find((user) => user.username === username)
  if (loggedInUser) {
    req.session.user = username
    res.send({
      result: username
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
