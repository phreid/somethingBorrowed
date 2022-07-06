import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ItemCard from './ItemCard'
import { getAllItemsAsync } from '../redux/items/thunks'
import { getAllUsersAsync } from '../redux/users/thunks'

// ItemContainer is used in MyItems page
function ItemContainer (props) {
  const user = useSelector(state => state.user)
  const [currUser, setCurrUser] = useState(user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllItemsAsync())
    dispatch(getAllUsersAsync())
  }, [])

  useEffect(() => {
    setCurrUser(user)
  }, [])

  // console.log('1')
  console.log(currUser)
  const users = useSelector(state => state.user.list)
  console.log('2')
  console.log(users)
  let userId = users.filter(user => user.username === currUser.username)
  userId = userId[0].id
  // userId = userId.id
  console.log('3')
  console.log(userId)
  const items = useSelector(state => state.items.list)
  const myItems = items.filter(item => item.owner === userId)

  console.log('4')
  console.log(myItems)

  return (
    <Container fluid className="item-container">
      {myItems.map(item => {
        return <ItemCard key={item.id}
          id={item.id}
          userId={item.userId}
          image={item.image}
          name={item.name}
          description={item.description}
          type={item.type}
          location={item.location}
          status={item.status}
          delete
          edit
          modalOpen={item.modalOpen}
          changeToReturned
          toggleUnavailable
        />
      })}
    </Container>
  )
}

export default ItemContainer
