import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getItemsAsync } from '../../redux/items/thunks'
import ItemCard from '../common/ItemCard'
import NavBar from '../common/NavBar'
import FiltersCollection from './FiltersCollection'
import ControlledCarousel from './ControlledCarousel'

import '../../styles.css'

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
      <div className="row">
        <div className="col grid-child page-container">
          <ControlledCarousel/>
        </div>
      </div>
      <div className="row">
        <div className="col-lg col-sm col-xs mx-8 grid-child page-container" key = "grid-child page-container">
          <FiltersCollection/>
        </div>
        <div className="col-lg col-sm col-xs mx-8 grid-child page-container">
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
              requestOpen={item.requestOpen}
              owner={item.owner._id}
              loggedInUser={user.user}
            />
          })}
        </div>
      </div>
    </>
  )
}

export default MarketplacePage
