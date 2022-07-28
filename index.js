const express = require('express')
const cors = require('cors')
const path = require('path')
const session = require('express-session')

require('dotenv').config()

const itemRouter = require('./routes/items')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
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

app.use('/items', itemRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)

app.use(express.static(path.join(__dirname, 'frontend', 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'public', 'index.html'))
})

const startApp = async () => {
  await connectToDatabase()
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
}

startApp()