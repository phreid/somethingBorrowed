const connectToDatabase = require('.')
const { LOCATIONS, STATUS } = require('../../constants')
const Item = require('../models/Item')
const User = require('../models/User')

const users = [
  {
    username: 'paul',
    password: 'paul',
    email: 'paul@example.com',
    location: LOCATIONS.UBC_CAMPUS
  },
  {
    username: 'imogene',
    password: 'imogene',
    email: 'imo@example.com',
    location: LOCATIONS.UBC_CAMPUS
  },
  {
    username: 'anusha',
    password: 'anusha',
    email: 'anusha@example.com',
    location: LOCATIONS.UBC_CAMPUS
  },
  {
    username: 'shirley',
    password: 'shirley',
    email: 'shirley@example.com',
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
  console.log('database seeded')

  process.exit(0)
}

seedDatabase()
