const mongoose = require('mongoose')

let MONGO_URI
if (process.env.LOCAL_DB) {
  MONGO_URI = 'mongodb://localhost:27017'
} else {
  MONGO_URI = 'mongodb+srv://sb-admin:sb-admin@somethingborrowed.x5o4r.mongodb.net/dev?retryWrites=true&w=majority'
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
