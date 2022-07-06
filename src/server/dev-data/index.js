// This file has temporary data for development, until we have a database

const STATUS = {
  AVAILABLE: 'Available',
  BORROWED: 'Borrowed',
  NOT_AVAILABLE: 'Not available'
}

// Hardcode these users ids, so we can reference them in the items list
const users = [
  {
    id: 'mehu42Cq1',
    username: 'paul',
    location: 'UBC Campus'
  },
  {
    id: 'BKUYC_iWl',
    username: 'imogene',
    location: 'login'
  },
  {
    id: 'wDEeJGsp9',
    username: 'anusha',
    location: 'UBC Campus'
  },
  {
    id: '2FGwYZEBn',
    username: 'shirley',
    location: 'UBC Campus'
  }
]

const items = [
  {
    id: 'tcoiyCt5U',
    image: '../../images/cricut.jpg',
    name: 'Cricut crafting tool',
    type: 'DIY',
    description: 'Good condition crafting tool, updated with latest software.',
    owner: 'mehu42Cq1',
    status: STATUS.AVAILABLE
  },
  {
    id: '_d_1XwK0Y',
    image: '../../images/bicyclePump.jpg',
    name: 'Bicyle pump',
    type: 'Outdoors',
    description: 'Bicycle pump with three valve attachments.',
    owner: 'BKUYC_iWl',
    status: STATUS.BORROWED
  },
  {
    id: '6TITwQBfo',
    image: '../../images/gardenTools.jpg',
    name: 'Gardening tools',
    type: 'Tools',
    description: 'Spade and clippers.',
    owner: 'wDEeJGsp9',
    status: STATUS.NOT_AVAILABLE
  },
  {
    id: 'tey5dbErJ',
    image: '../../images/handBlender.jpg',
    name: 'Hand blender',
    type: 'Kitchen',
    description: 'Kitchen-aid hand blender with whisk attachment.',
    owner: '2FGwYZEBn',
    status: STATUS.AVAILABLE
  }
]

module.exports = { items, users }
