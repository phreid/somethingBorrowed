import circuit from '../../images/circuit.jpg'
import bicyclePump from '../../images/bicyclePump.jpg'
import gardenTools from '../../images/gardenTools.jpg'
import handBlender from '../../images/handBlender.jpg'

export const baseItems = [
  {
    key: '1',
    id: 1,
    image: circuit,
    name: 'Cricut crafting tool',
    type: 'DIY',
    description: 'Good condition crafting tool, updated with latest software.',
    location: 'UBC Campus',
    status: 'Available'
  },
  {
    key: '2',
    id: 2,
    image: bicyclePump,
    name: 'Bicycle pump',
    type: 'Outdoors',
    description: 'Bicycle pump with three valve attachments.',
    location: 'UBC Campus',
    status: 'Available'
  },
  {
    key: '3',
    id: 3,
    image: gardenTools,
    name: 'Gardening tools',
    type: 'Tools',
    description: 'Spade and clippers.',
    location: 'UBC Campus',
    status: 'Available'
  },
  {
    key: '4',
    id: 4,
    image: handBlender,
    name: 'Hand blender',
    type: 'Kitchen',
    description: 'Kitchen-aid hand blender with whisk attachment.',
    location: 'UBC Campus',
    status: 'Available'
  }
]
