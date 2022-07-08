const express = require('express')
const cors = require('cors')
const session = require('express-session')

const itemRouter = require('./routes/items')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const connectToDatabase = require('./database')

const app = express()
const port = 4000

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

const startApp = async () => {
  await connectToDatabase()
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
}

startApp()
