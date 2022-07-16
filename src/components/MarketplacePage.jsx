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
      <div className="grid-container">
        <div className="grid-child page-container" key = "grid-child page-container">
          <Search/>
        </div>
        <div className="grid-child page-container">
          {items.map(item => {
            return <ItemCard key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              status={item.status}
              borrow
              ratingComments={item.ratingComments}
			  type={item.type}
			  description={item.description}
			  rating={item.rating}
			  location={item.location}
            />
          })}
        </div>
      </div>
    </>
  )
}

export default MarketplacePage
