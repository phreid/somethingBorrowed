import NavBar from './NavBar'
import { Card, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import profile from '../images/profile.png'
import { useDispatch, useSelector } from 'react-redux'
import { React, useEffect } from 'react'
import { getCurrentUserAsync } from '../redux/users/thunks'

function ProfilePage () {
  const userId = useSelector(state => state.user.currentUserId)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCurrentUserAsync(userId))
  }, [dispatch])

  const currentUser = useSelector(state => state.user.currentUser)
  console.log('=>', currentUser)

  return (
    <>
      <NavBar />
      <Card.Header className="text-center" as='h4'>My Profile</Card.Header>
      <>
        <Card className="text-center" style={{ width: '' }}>
          <Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
            <div className="col-md-4">
              <Card.Img variant="top" src={profile} />
              <Card.Body>
                <Card.Title>{currentUser.username}</Card.Title>
                <Card.Text>{currentUser.bio}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{currentUser.email}</ListGroupItem>
                <ListGroupItem>{currentUser.location}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Edit Profile</Card.Link>
                <Card.Link href="#">Sign Out</Card.Link>
              </Card.Body>
            </div>
          </Row>
        </Card>
      </>
    </>
  )
}

export default ProfilePage
