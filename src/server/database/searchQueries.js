const searchResult = require('../models/searchResult')
const items = require('../models/Item')
const queries = {
  applyFilters: async function (searchText, Kitchen, Outdoor, Tools, DIY) {
    const cards = await items.find({ name: { $regex: searchText } })
    if (Kitchen) {
      cards.find({ type: "Kitchen" })
    }
    if (Outdoor) {
      cards.find({ type: "Outdoors" })
    }
    if (Tools) {
      cards.find({ type: "Tools"})
    }
	if (DIY) {
		cards.find({ type: "DIY" })
	}
    return cards
  },
  noFilters: async function () {
	
    return await items.find({ name: "Kitchen" })
  }

}

module.exports = queries
