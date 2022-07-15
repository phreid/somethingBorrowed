const mongoose = require('mongoose')

// create schema
const searchResultSchema = new mongoose.Schema({
	id: String,
	name: String,
	image: String, 
  	type: {
    	type: String,
    	enum: ['DIY', 'Outdoors', 'Tools', 'Kitchen']
  	},
 	description: String,
	location: String,
 	// owner: { type: Schema.Types.ObjectId, ref: 'User' },
  	status: {
    	type: String,
    	enum: ['Available', 'Borrowed']
  	}
})

// create model
const searchResult = mongoose.model('searchResult', searchResultSchema)


module.exports = searchResult
