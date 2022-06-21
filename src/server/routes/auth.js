const express = require('express')

const router = express.Router()

const { isLoggedIn } = require('../middleware')

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
  const { username, password } = req.body

  // fake login, don't check anything
  console.log(username)
  console.log(password)

  req.session.user = username
  res.send(username)
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
