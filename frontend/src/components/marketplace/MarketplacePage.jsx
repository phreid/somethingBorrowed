import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getAllItemsAsync } from '../../redux/items/thunks'
import { getAllRequestsAsync } from '../../redux/requests/thunks'
import ItemCard from '../common/ItemCard'
import NavBar from '../common/NavBar'
import FiltersCollection from './FiltersCollection'

function MarketplacePage () {
  const user = useSelector(state => state.user)
  const items = useSelector(state => {
    return state.items.list.filter(item => item.owner._id !== user.user)
  })
  const requests = useSelector(state => {
    return state.requests.list.filter(request => request.requestor._id === user.user)
  })

  const requestIds = requests.map(a => a.item._id)
  const noRequestedItems = items.filter(item => !requestIds.includes(item._id))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllItemsAsync())
    dispatch(getAllRequestsAsync())
  }, [dispatch])

  return (
    <>
      <NavBar />
      <h1 className="page-title">Marketplace</h1>
      <div className="grid-container">
        <div className="grid-child page-container" key = "grid-child page-container">
          <FiltersCollection/>
        </div>
        <div className="grid-child page-container">
          {noRequestedItems.map(item => {
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
