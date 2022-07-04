import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ItemCard from './ItemCard'
import { getAllItemsAsync } from '../redux/items/thunks'

function ItemContainer () {
  const items = useSelector(state => state.items.list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllItemsAsync())
  }, [dispatch])

  return (
    <Container fluid className="item-container">
      {items.map(item => {
        return <ItemCard key={item._id}
          id={item._id}
          image={item.image}
          name={item.name}
          description={item.description}
          type={item.type}
          location={item.owner.location}
          status={item.status}
          delete
          edit
          modalOpen={item.modalOpen}
        />
      })}
    </Container>
  )
}

export default ItemContainer
