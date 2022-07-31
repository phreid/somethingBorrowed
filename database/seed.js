require('dotenv').config()

const connectToDatabase = require('.')
const { LOCATIONS, STATUS, REQUEST_STATUS } = require('../constants')
const Item = require('../models/Item')
const User = require('../models/User')
const Request = require('../models/Request')

const users = [
  {
    username: 'paul',
    password: 'paul',
    email: 'paul@example.com',
    bio: "Hi, I'm Paul",
    location: LOCATIONS.UBC_CAMPUS
  },
  {
    username: 'imogene',
    password: 'imogene',
    email: 'imo@example.com',
    bio: "Hi, I'm Imogene",
    location: LOCATIONS.UBC_CAMPUS
  },
  {
    username: 'anusha',
    password: 'anusha',
    email: 'anusha@example.com',
    bio: "Hi, I'm Anusha",
    location: LOCATIONS.UBC_CAMPUS
  },
  {
    username: 'shirley',
    password: 'shirley',
    email: 'shirley@example.com',
    bio: "Hi, I'm Shirley",
    location: LOCATIONS.UBC_CAMPUS
  }
]

const items = [
  {
    name: 'Cricut crafting tool',
    type: 'DIY',
    description: 'Good condition crafting tool, updated with latest software.',
    owner: 'paul',
    status: STATUS.AVAILABLE
  },
  {
    name: 'Bicyle pump',
    type: 'Outdoors',
    description: 'Bicycle pump with three valve attachments.',
    owner: 'imogene',
    status: STATUS.BORROWED
  },
  {
    name: 'Gardening tools',
    type: 'Tools',
    description: 'Spade and clippers.',
    owner: 'anusha',
    status: STATUS.BORROWED
  },
  {
    name: 'Hand blender',
    type: 'Kitchen',
    description: 'Kitchen-aid hand blender with whisk attachment.',
    owner: 'shirley',
    status: STATUS.AVAILABLE
  }
]

const requests = [
  {
    itemName: 'Hand blender',
    itemId: '62e377b7352a0124fbe64242',
    itemOwner: '62e377b7352a0124fbe64236',
    requestorName: 'imogene',
    requestorId: '62e377b7352a0124fbe64232',
    requestorEmail: 'imo@example.com',
    reqestorNotes: 'I would like to borrow this item',
    daysNeededFor: 7,
    dateNeededOn: '08-08-2022',
    status: REQUEST_STATUS.PENDING
  },
  {
    itemName: 'Cricut crafting tool',
    itemId: '62e377b7352a0124fbe64239',
    itemOwner: '62e377b7352a0124fbe64230',
    requestorName: 'imogene',
    requestorId: '62e377b7352a0124fbe64232',
    requestorEmail: 'imo@example.com',
    reqestorNotes: 'I would like to borrow this item',
    daysNeededFor: 5,
    dateNeededOn: '08-09-2022',
    status: REQUEST_STATUS.PENDING
  }
]

const seedDatabase = async () => {
  await connectToDatabase()
  console.log('clearing collections...')

  await Item.deleteMany({})
  await User.deleteMany({})

  console.log('adding users...')
  for (const user of users) {
    const document = new User({ ...user })
    await document.save()
  }

  console.log('adding items...')
  for (const item of items) {
    const user = await User.findOne({ username: item.owner })
    const document = new Item({ ...item, owner: user._id })
    await document.save()
  }

  console.log('adding requests...')
  for (const request of requests) {
    const requestor = await User.findOne({ username: request.requestorName })
    const owner = await User.findOne({ username: request.itemOwner })
    const item = await Item.findOne({ name: request.itemName })
    const document = new Request({
      ...request,
      itemName: item.name,
      itemId: item._id,
      itemOwner: owner._id,
      itemOwnerLocation: owner.location,
      requestorName: requestor.username,
      requestorId: requestor._id,
      requestorEmail: requestor.email,
      requestorLocation: requestor.location
    })
    await document.save()
  }
  console.log('database seeded')

  process.exit(0)
}

seedDatabase()
