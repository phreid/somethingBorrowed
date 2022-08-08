import { React, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { getUserHistoryAsync } from '../../redux/users/thunks'
import ItemCard from '../common/ItemCard'

import '../../styles.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function UserHistoryPage () {
  const user = useSelector(state => state.user.user)
  const userHistory = useSelector(state => {
    const uniqueItems = []

    const sortedHistory = [...state.user.userHistory].sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )
    sortedHistory.forEach((record) => {
      if (!uniqueItems.some((existing) => existing.item._id === record.item._id)) {
        uniqueItems.push(record)
      }
    })

    return uniqueItems
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserHistoryAsync(user))
  }, [dispatch, user])

  return (
    <>
      <br/>
      <h2 className='add-item-heading'>Borrowing History</h2>
      <Container fluid className="single-column-marketplace-container">
        <Row>
          {userHistory.length
            ? userHistory.map(record => {
              return <Col sm={6} key={record.item._id}> <ItemCard key={record.item._id + record.date}
                description={record.item.description}
                editRating
                id={record.item._id}
                image={record.item.image}
                location={record.item.owner.location}
                name={record.item.name}
                rating={record.item.rating}
                ratingComments={record.item.ratingComments}
                ratingOpen={record.item.ratingOpen}
                status={record.item.status}
                type={record.item.type}
                borrowedDate={record.date}
              />
              </Col>
            })
            : <p className="text-center">You haven't borrowed any items yet.</p>
          }
        </Row>
      </Container>
    </>
  )
}
