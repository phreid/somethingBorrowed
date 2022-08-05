import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import ItemCard from '../common/ItemCard'
import { useSelector, useDispatch } from 'react-redux'
import { getItemsAsync } from '../../redux/items/thunks'

const RECOMMANDATION_STANDARD = 1

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

  const displayedInCarouselItems = items.filter((item) => item.numberOfTimesBorrowed > RECOMMANDATION_STANDARD)

  console.log(displayedInCarouselItems)

  const display = displayedInCarouselItems.map((item) => {
    return <Carousel.Item key={item._id}><ItemCard
      id={item._id}
      borrow
      description={item.description}
      image={item.image}
      name={item.name}
      status={item.status}
      ratingComments={item.ratingComments}
      type={item.type}
      rating={item.rating}
      location={item.owner.location}
      numberOfTimesBorrowed={item.numberOfTimesBorrowed}
      featured
    />
    </Carousel.Item>
  })

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <h5>Most Borrowed Items</h5>
      {display}
    </Carousel>
  )
}
export default ControlledCarousel
