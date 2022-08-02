import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import ItemCard from '../common/ItemCard'

const RECOMMANDATION_STANDARD = 1

function ControlledCarousel (prop) {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  const items = prop.items

  const itemList = items.map((item) => {
    if (!item.numberOfTimesBorrowed || item.numberOfTimesBorrowed < RECOMMANDATION_STANDARD) {
      return null
    }
    return <Carousel.Item><ItemCard key={item._id}
      id={item._id}
      borrow
      description={item.description}
      image={item.image}
      name={item.name}
      status={item.status}
      ratingComments={item.ratingComments}
      type={item.type}
      rating={item.rating}
      location={item.owner.location}/>
    </Carousel.Item>
  })

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {itemList}
    </Carousel>
  )
}
export default ControlledCarousel
