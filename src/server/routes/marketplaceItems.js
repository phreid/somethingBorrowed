const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')
const mongoose = require('mongoose')
const queries = require('../database/searchQueries')
const Item = require('../models/Item')

let displayList = [] // [{id: uuid(), "title":"Sample Title", "ingredients": "Love 1g; Patient 1g", "instructions":"Love;Patient", "visibility": false, "editorVisibility":false}]
async function getAll () {
	console.log("!!!!Q!!")
	const items = await Item.find().populate('owner')
	return []
}

async function allFilter (searchText, cList) {
	console.log("!!!Q!!!")
  const hasC = cList.length > 0
  return await queries.applyFilters(searchText, cList[0], cList[1], cList[2], cList[3])
}


router.get('/', function (req, res, next) {
	
  /**getAll().then((theList) => {
	console.log("!!!"+req.params)
	console.log("!!!"+req.params)
    displayList = theList
	res.send({
		result: displayList
	  })
    // res.send(displayList)
  }).catch(err => console.log(err)) */
  
})

router.get('/filter/', function (req, res, next) {
	
  allFilter(req.params.searchText, req.params.cList).then((theList) => {
    displayList = theList
    res.send(displayList)
	console.log("!!!"+req.params.cList)
	console.log("!!!"+req.params.searchText)
  }).catch(err => console.log(err))
})


module.exports = router
