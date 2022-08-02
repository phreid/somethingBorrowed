import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getItemsAsync } from '../../redux/items/thunks'
import ItemCard from '../common/ItemCard'
import NavBar from '../common/NavBar'
import FiltersCollection from './FiltersCollection'
import ControlledCarousel from './ControlledCarousel'

function MarketplacePage () {
  const user = useSelector(state => state.user)
  const items = useSelector(state => {
    return state.items.list.filter(item => item.owner._id !== user.user)
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItemsAsync())
  }, [dispatch])

  return (
    <>
      <NavBar />
      <h1 className="page-title">Marketplace</h1>
      <div className="grid-container">
        <div className="grid-child page-container" key = "grid-child page-container">
          <FiltersCollection/>
          <br></br>
          <br></br>
          <br></br>
          <ControlledCarousel items={items}/>
        </div>
        <div className="grid-child page-container">
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
