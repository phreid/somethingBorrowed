import { React, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import ItemCard from './ItemCard'
import NavBar from './NavBar'
import Search from './Search'

import { getAllItemsAsync } from '../redux/items/thunks'

function MarketplacePage () {
  const user = useSelector(state => state.user)
  const items = useSelector(state => {
    return state.items.list.filter(item => item.owner._id !== user.user)
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllItemsAsync())
  }, [dispatch])

  return (
    <>
      <NavBar />
      <h1 className="page-title">Marketplace</h1>
      <div className="filter-container">
        <Search/>
      </div>
      <div className="marketplace">
        <div className="borrowed-items-container">
          {items.map(item => {
            return <ItemCard key={item._id}
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
            />
          })}
        </div>
      </div>
    </>
  )
}

export default MarketplacePage
