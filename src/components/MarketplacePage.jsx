import React from 'react'

import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

import ItemCard from './ItemCard'
import NavBar from './NavBar'

import '../styles.css'

function MarketplacePage () {
  const items = useSelector(state => state.itemsSlice.items)
  return (
    <>
      <NavBar />
      <h1 className="page-title">Marketplace</h1>
      <div className="grid-container">
        <div className="grid-child page-container">
          <p>placeholder</p>
        </div>
        <div className="grid-child page-container" id="container-border">
          <Container fluid className="item-container">
            {items.map(item => {
              return <ItemCard key={item.id}
                image={item.image}
                name={item.name}
                description={item.description}
                type={item.type}
                location={item.location}
                status={item.status}
                borrow
              />
            })}
          </Container>
        </div>
      </div>
    </>
  )
}

export default MarketplacePage
