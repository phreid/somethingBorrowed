import { nanoid } from 'nanoid'

import cricut from '../../images/cricut.jpg'
import bicyclePump from '../../images/bicyclePump.jpg'
import gardenTools from '../../images/gardenTools.jpg'
import handBlender from '../../images/handBlender.jpg'

export const baseItems = [
  {
    id: nanoid(11),
    image: cricut,
    name: 'Cricut crafting tool',
    type: 'DIY',
    description: 'Good condition crafting tool, updated with latest software.',
    location: 'UBC Campus',
    status: 'Available'
  },
  {
    id: nanoid(11),
    image: bicyclePump,
    name: 'Bicycle pump',
    type: 'Outdoors',
    description: 'Bicycle pump with three valve attachments.',
    location: 'UBC Campus',
    status: 'Available'
  },
  {
    id: nanoid(11),
    image: gardenTools,
    name: 'Gardening tools',
    type: 'Tools',
    description: 'Spade and clippers.',
    location: 'UBC Campus',
    status: 'Available'
  },
  {
    id: nanoid(11),
    image: handBlender,
    name: 'Hand blender',
    type: 'Kitchen',
    description: 'Kitchen-aid hand blender with whisk attachment.',
    location: 'UBC Campus',
    status: 'Available'
  }
]