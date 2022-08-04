import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import ItemCard from '../common/ItemCard'
import { useSelector, useDispatch } from 'react-redux'
import { getItemsAsync } from '../../redux/items/thunks'

const RECOMMANDATION_STANDARD = -1

function ControlledCarousel () {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  const user = useSelector(state => state.user)
  const items = useSelector(state => {
    return state.items.list.filter(item => item.owner._id !== user.user)
  })
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getItemsAsync())
  }, [dispatch])

  const displayedInCarouselItems = items.map((item) => {
    if (item.numberOfTimesBorrowed == null || item.numberOfTimesBorrowed < RECOMMANDATION_STANDARD) {
      return null
    }
    return <Carousel.Item><ItemCard key={item._id}
      id={item._id}
      borrow
      description={item.numberOfTimesBorrowed}
      image={item.image}
      name={item.name}
      status={item.status}
      ratingComments={item.ratingComments}
      type={item.type}
      rating={item.rating}
      location={item.owner.location}
    />
    </Carousel.Item>
  })

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {displayedInCarouselItems}
    </Carousel>
  )
}
export default ControlledCarousel
