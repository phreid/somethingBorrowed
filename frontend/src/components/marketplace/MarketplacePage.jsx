import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'

import { getAllRequestsAsync } from '../../redux/requests/thunks'
import { getItemsAsync } from '../../redux/items/thunks'
import ItemCard from '../common/ItemCard'
import NavBar from '../common/NavBar'
import FiltersCollection from './FiltersCollection'
import ControlledCarousel from './ControlledCarousel'

import '../../styles.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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
    dispatch(getAllRequestsAsync())
    dispatch(getItemsAsync())
  }, [dispatch])

  return (
    <>
      <NavBar />
      <div key="page-container">
        <ControlledCarousel/>
      </div>
      <FiltersCollection/>
      <Container fluid className="single-column-marketplace-container">
        <Row>
          {noRequestedItems.map(item => {
            return <Col sm={6} key={item._id}> <ItemCard
              key={item._id}
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
            </Col>
          })}
        </Row>
      </Container>
    </>
  )
}

export default MarketplacePage
