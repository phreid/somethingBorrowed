const express = require('express')
const { STATUS } = require('../../constants')
const { isLoggedIn, isItemOwner } = require('../middleware')

const Item = require('../models/Item')

const router = express.Router()

/**
 * GET /items
 *
 * Retrieves all items.
 *
 * @returns a list of item objects
 */
router.get('/', async (req, res) => {
  const items = await Item.find().populate('owner')
  res.send({
    result: items
  })
})

/**
 * GET /items/:id
 *
 * Retrieves a single item.
 *
 * @param id: the item id to retrieve
 * @returns a single item object
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const item = await Item.findById(id).populate('owner')
  res.send({
    result: item
  })
})

/**
 * POST /items
 *
 * Creates a new item and adds it to the collection.
 * Requires the sender to be logged in.
 *
 * Request body: an item object
 *
 * @returns the newly created item object
 */
router.post('/', isLoggedIn, async (req, res) => {
  const newItem = new Item({ owner: req.session.user, ...req.body })
  await newItem.save()
  const itemWithOwner = await newItem.populate('owner')
  res.send({
    result: itemWithOwner
  })
})

/**
 * DELETE /items/:id
 *
 * Removes an item from the collection. Requires the sender to be logged in as
 * the owner of the item being deleted.
 *
 * @param id: the item id to delete
 * @returns the deleted item object
 */
router.delete('/:id', isLoggedIn, isItemOwner, async (req, res) => {
  const { id } = req.params
  const deleted = await Item.findByIdAndDelete(id).populate('owner')
  res.send({
    result: deleted
  })
})

/**
 * PATCH /items/:id
 *
 * Updates an item's fields. Requires the sender to be logged in as the
 * owner of the item being updated.
 *
 * Request body: an object with the updated item fields
 *
 * @param id: the item id to update
 * @returns the updated item object
 */
router.patch('/:id', isLoggedIn, isItemOwner, async (req, res) => {
  const { id } = req.params
  const updated = await Item.findByIdAndUpdate(id, req.body, { new: true }).populate('owner')
  res.send({
    result: updated
  })
})

/**
 * POST /items/:id/borrow
 *
 * Sets an items status to borrowed. Requires the sender to be logged in.
 *
 * Request body: { borrower: _username }
 *
 * @param id: the item id to borrow
 * @return the updated item
 */
router.post('/:id/borrow', isLoggedIn, async (req, res) => {
  const { id } = req.params
  const borrowed = await Item.findByIdAndUpdate(id, { status: STATUS.BORROWED }, { new: true }).populate('owner')
  res.send({
    result: borrowed
  })
})

/**
 * POST /items/:id/rating
 *
 * Sets an items rating and comments. Requires the sender to be logged in.
 *
 * @param id: the item id to borrow
 * @return the updated item
 */
router.post('/:id/rating', isLoggedIn, async (req, res) => {
  const { id } = req.params

  const rated = await Item.findByIdAndUpdate(id, { rating: req.body.rating, ratingComments: req.body.ratingComments }, { new: true }).populate('owner')

  res.send({
    result: rated
  })
})

router.get('/loadMarketplace/:currUser', async (req, res) => {
	const id  = req.params.currUser
	console.log(id)
	//console.log(Item.find())
	const item = await Item.find({owner: { "$ne": id } })
	console.log(item)
	res.send({
	  result: item
	})
})

router.get('/filter/:searchText', async (req, res) => {
	const searchText = JSON.parse(req.params.searchText).searchText
	const categoryList = JSON.parse(req.params.searchText).cList
	const currentUser = JSON.parse(req.params.searchText).currUser
	
	if(searchText === "" && categoryList.length == 0){
		const items = await Item.find({owner: { "$ne":  currentUser}}).populate('owner')
		res.send({
			result: items
		})
	}else if(!(searchText === "") && categoryList.length != 0){
		let cList = []

		let items; 
		if(categoryList[0]){
			cList.push('Kitchen')
		}
		if(categoryList[1]){
			cList.push('Outdoors')
		}
		if(categoryList[2]){
			cList.push('Tools')
		}
		if(categoryList[3]){
			cList.push('DIY')
		}
		if(cList.length==0){
			cList.push('Kitchen')
			cList.push('Outdoors')
			cList.push('Tools')
			cList.push('DIY')
		}
		items = await Item.find({owner: { "$ne": currentUser }, name: { $regex: searchText }, type: {$in: cList}})
		res.send({
			result: items
		})
	}else if(searchText === "" && categoryList.length != 0){
		let cList = []

		let items; 
		if(categoryList[0]){
			cList.push('Kitchen')
		}
		if(categoryList[1]){
			cList.push('Outdoors')
		}
		if(categoryList[2]){
			cList.push('Tools')
		}
		if(categoryList[3]){
			cList.push('DIY')
		}
		if(cList.length==0){
			cList.push('Kitchen')
			cList.push('Outdoors')
			cList.push('Tools')
			cList.push('DIY')
		}
		
		items = await Item.find({owner: { "$ne": currentUser }, type: {$in: cList}})
		res.send({
			result: items
		})
	}
})

module.exports = router
