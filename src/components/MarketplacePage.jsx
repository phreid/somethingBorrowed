import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

import ItemCard from './ItemCard'
import NavBar from './NavBar'
import { getAllItemsAsync } from '../redux/items/thunks'

import '../styles.css'

function MarketplacePage () {
  const items = useSelector(state => state.items.list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllItemsAsync())
  }, [dispatch])

  return (
    <>
      <NavBar />
      <h1 className="page-title">Marketplace</h1>
      <div className="grid-container">
        <div className="grid-child page-container">
          <p>placeholder</p>
        </div>
        <div className="grid-child page-container">
          {items.length
            ? <Container fluid className="item-container">
              {items.map(item =>
                <ItemCard key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  description={item.description}
                  type={item.type}
                  location={item.owner.location}
                  rating={item.rating}
                  ratingComments={item.ratingComments}
                  status={item.status}
                  borrow
                />
              )}
            </Container>
            : <p>There are no items to display</p>
          }
        </div>
      </div>
    </>
  )
}

export default MarketplacePage
