// This file has temporary data for development. If the data in our dev
// database is deleted, we can use this file to re-seed it.

const STATUS = {
  AVAILABLE: 'Available',
  BORROWED: 'Borrowed'
}

const users = [
  {
    username: 'paul',
    password: 'paul',
    location: 'UBC Campus'
  },
  {
    username: 'imogene',
    password: 'imogene',
    location: 'UBC Campus'
  },
  {
    username: 'anusha',
    password: 'anusha',
    location: 'UBC Campus'
  },
  {
    username: 'shirley',
    password: 'shirley',
    location: 'UBC Campus'
  }
]

const items = [
  {
    name: 'Cricut crafting tool',
    type: 'DIY',
    description: 'Good condition crafting tool, updated with latest software.',
    owner: '62be9190cc9c93cb39110092',
    status: STATUS.AVAILABLE
  },
  {
    name: 'Bicyle pump',
    type: 'Outdoors',
    description: 'Bicycle pump with three valve attachments.',
    owner: '62be9190cc9c93cb39110093',
    status: STATUS.BORROWED
  },
  {
    name: 'Gardening tools',
    type: 'Tools',
    description: 'Spade and clippers.',
    owner: '62be9190cc9c93cb39110090',
    status: STATUS.BORROWED
  },
  {
    name: 'Hand blender',
    type: 'Kitchen',
    description: 'Kitchen-aid hand blender with whisk attachment.',
    owner: '62be9190cc9c93cb39110091',
    status: STATUS.AVAILABLE
  }
]

module.exports = { items, users }
