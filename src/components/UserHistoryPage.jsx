import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ItemCard from './ItemCard'
import { getAllItemsAsync } from '../redux/items/thunks'

import NavBar from './NavBar'
import MyItemsNavBar from './MyItemsNavBar'

import '../styles.css'

export default function UserHistoryPage () {
  const user = useSelector(state => state.user)
  // TODO - pull user's history
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
      <MyItemsNavBar />
      <br></br>
      <div className="my-borrowed-items">
        <h2>My Borrowed Items</h2>
        <Container fluid className="item-container">
          {items.map(item => {
            return <ItemCard key={item._id}
              description={item.description}
              id={item._id}
              image={item.image}
              location={item.owner.location}
              name={item.name}
              status={item.status}
              type={item.type}
              userId={item.userId}
              rating
              ratingComments
              ratingOpen={item.ratingOpen}
            />
          })}
        </Container>
      </div>
    </>
  )
}
