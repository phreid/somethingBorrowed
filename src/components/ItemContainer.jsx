import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ItemCard from './ItemCard'
import { getAllItemsAsync } from '../redux/items/thunks'

// ItemContainer is used in MyItems page
function ItemContainer (props) {
  const user = useSelector(state => state.user)
  const items = useSelector(state => {
    return state.items.list.filter(item => item.owner._id === user.user)
  })
  const dispatch = useDispatch()
  // console.log(user)
  // console.log(items)

  useEffect(() => {
    dispatch(getAllItemsAsync())
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
