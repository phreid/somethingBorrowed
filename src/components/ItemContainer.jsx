import React from 'react'
import ItemCard from './ItemCard'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

function ItemContainer () {
  const items = useSelector(state => state.itemsSlice.items)

  return (
    <Container fluid className="item-container">
      {items.map(item => {
        return <ItemCard key={item.id}
          image={item.image}
          name={item.name}
          description={item.description}
          type={item.type}
          location={item.location}
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
