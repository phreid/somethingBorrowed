const mongoose = require('mongoose')
require('dotenv').config()

let MONGO_URI
if (process.env.LOCAL_DB) {
  MONGO_URI = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.wepyv.mongodb.net/?retryWrites=true&w=majority'
  //'mongodb://localhost:27017/dev'
  // 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.wepyv.mongodb.net/?retryWrites=true&w=majority'
} else {
  MONGO_URI = process.env.MONGO_URI
}

const connectToDatabase = async () => {
  try {
    const mongo = await mongoose.connect(MONGO_URI)
    console.log(`mongodb connected: ${mongo.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectToDatabase
