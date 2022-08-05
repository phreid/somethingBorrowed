const express = require('express')
const cors = require('cors')
const path = require('path')
const session = require('express-session')

require('dotenv').config()

const itemRouter = require('./routes/items')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const requestRouter = require('./routes/requests')
const { errorHandler } = require('./middleware/error')
const connectToDatabase = require('./database')

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(session({
  secret: 'test-secret',
  resave: false,
  saveUninitialized: true
}))

app.use('/api/items', itemRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/requests', requestRouter)

app.use(express.static(path.join(__dirname, 'frontend', 'build')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

app.use(errorHandler)

const startApp = async () => {
  await connectToDatabase()
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
}

startApp()
