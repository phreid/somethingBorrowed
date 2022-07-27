const mongoose = require('mongoose')

let MONGO_URI
if (process.env.LOCAL_DB) {
  MONGO_URI = 'mongodb://localhost:27017/dev'
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
