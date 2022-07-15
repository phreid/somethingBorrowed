const express = require('express')
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
  // const itemsWithLocation = items.map((item) => {
  //   const ownerId = item.owner
  //   const owner = users.find((user) => user.id === ownerId)
  //   return { ...item, location: owner.location }
  // })
  const items = await Item.find().populate('owner')
  res.send({
    result: items
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
	// const itemsWithLocation = items.map((item) => {
	//   const ownerId = item.owner
	//   const owner = users.find((user) => user.id === ownerId)
	//   return { ...item, location: owner.location }
	// })
	// `${req.params['searchText']}`
	//{ $regex: "garden" }
	const searchText = JSON.parse(req.params.searchText).searchText
	const categoryList = JSON.parse(req.params.searchText).cList
	const currentUser = JSON.parse(req.params.searchText).currUser
	//'62cc9e76d1b3f9496a70c52d'
	//console.log(searchText === "");
	if(searchText === "" && categoryList.length == 0){
		//console.log("1")
		const items = await Item.find({owner: { "$ne":  currentUser}}).populate('owner')
		res.send({
			result: items
		})
	}else if(!(searchText === "") && categoryList.length != 0){
		// console.log(typeof(searchText) + "!")
		//console.log("2")
		let cList = []

		let items; 
		if(categoryList[0]){
			cList.push('Kitchen')
			//items = await Item.find({name: { $regex: searchText }, type: 'Kitchen'})
		}
		if(categoryList[1]){
			cList.push('Outdoors')
			//items = await Item.find({name: { $regex: searchText }, type: 'Outdoors'})
		}
		if(categoryList[2]){
			cList.push('Tools')
			//items = await Item.find({name: { $regex: searchText }, type: 'Tools'})
		}
		if(categoryList[3]){
			cList.push('DIY')
			//items = await Item.find({name: { $regex: searchText }, type: {$in: ['some title', 'some other title']}})
		}
		if(cList.length==0){
			cList.push('Kitchen')
			cList.push('Outdoors')
			cList.push('Tools')
			cList.push('DIY')
		}
		//else{
			//cList.push('')
			//items = await Item.find({name: { $regex: searchText }})
		//}
		// = await Item.find({name: { $regex: searchText }})
		// console.log(items)
		items = await Item.find({owner: { "$ne": currentUser }, name: { $regex: searchText }, type: {$in: cList}})
		res.send({
			result: items
		})
	}else if(searchText === "" && categoryList.length != 0){
		//console.log("3")
		/**let items; 
		if(categoryList[0]){
			items = await Item.find({ type: 'Kitchen'})
		}else if(categoryList[1]){
			items = await Item.find({ type: 'Outdoors'})
		}else if(categoryList[2]){
			items = await Item.find({ type: 'Tools'})
		}else if(categoryList[3]){
			items = await Item.find({ type: 'DIY'})
		}else{
			items = await Item.find({name: { $regex: searchText }})
		} */
		// = await Item.find({name: { $regex: searchText }})
		// console.log(items)
		let cList = []

		let items; 
		if(categoryList[0]){
			cList.push('Kitchen')
			//items = await Item.find({name: { $regex: searchText }, type: 'Kitchen'})
		}
		if(categoryList[1]){
			cList.push('Outdoors')
			//items = await Item.find({name: { $regex: searchText }, type: 'Outdoors'})
		}
		if(categoryList[2]){
			cList.push('Tools')
			//items = await Item.find({name: { $regex: searchText }, type: 'Tools'})
		}
		if(categoryList[3]){
			cList.push('DIY')
			//items = await Item.find({name: { $regex: searchText }, type: {$in: ['some title', 'some other title']}})
		}
		if(cList.length==0){
			cList.push('Kitchen')
			cList.push('Outdoors')
			cList.push('Tools')
			cList.push('DIY')
		}
		//console.log(cList)
		items = await Item.find({owner: { "$ne": '62cc9e76d1b3f9496a70c52d' }, type: {$in: cList}})
		res.send({
			result: items
		})
	}
	
	// console.log(req.params)
	//req.params.searchText
	//const cards = await Item.find({ name: { $regex: `${req.params['searchText']}` } }).populate('owner');
    // req.params.cList[1]
	
    //return cards
	//const items = await Item.find().populate('owner')
	//res.send({
	  //result: cards
	//})
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
  const item = await Item.findById(id)
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
  res.send({
    result: newItem
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
  const deleted = await Item.findByIdAndDelete(id)
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
  const updated = await Item.findByIdAndUpdate(id, req.body, { new: true })
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
  // const idx = items.findIndex((item) => item.id === id)
  // items[idx] = { ...items[idx], status: 'Borrowed' }
  const borrowed = await Item.findByIdAndUpdate(id, { status: 'Borrowed' }, { new: true })
  res.send({
    result: borrowed
  })
})

module.exports = router
