import { React, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getItemsAsync } from '../../redux/items/thunks'
import ItemCard from '../common/ItemCard'

function ItemContainer () {
  const user = useSelector(state => state.user)
  const items = useSelector(state => {
    return state.items.list.filter(item => item.owner._id === user.user)
  })
  const dispatch = useDispatch()
  // console.log(items[0].numberOfTimesBorrowed)
  useEffect(() => {
    dispatch(getItemsAsync())
  }, [dispatch])

  return (
    <Container fluid className="item-container">
      {items.map(item => {
        return <ItemCard key={item._id}
          changeToReturned
          description={item.description}
          delete
          edit
          id={item._id}
          image={item.image}
          location={item.owner.location}
          modalOpen={item.modalOpen}
          name={item.name}
          rating={item.rating}
          ratingComments={item.ratingComments}
          status={item.status}
          toggleUnavailable
          type={item.type}
          userId={item.userId}
        />
      })}
    </Container>
  )
}

export default ItemContainer
