import NavBar from './NavBar'
import { Button, Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import profile from '../images/profile.png'
import { useDispatch, useSelector } from 'react-redux'
import { React, useEffect, useState } from 'react'
import { getCurrentUserAsync } from '../redux/users/thunks'

function ProfilePage () {
  const userId = useSelector(state => state.user.currentUserId)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUserAsync(userId))
  }, [dispatch])

  const currentUser = useSelector(state => state.user.currentUser)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <NavBar />
      <>
        <Card className="profile-card" style={{ width: '' }}>
          <Card.Body className="text-center">
            <Card.Img className="profile-img" variant="center" width="80" src={profile} />
            <Card.Title>{currentUser.username}</Card.Title>
            <Card.Text>{currentUser.bio}</Card.Text>
            <ListGroup className="list-group-flush center">
              <ListGroupItem>{currentUser.email}</ListGroupItem>
              <ListGroupItem>{currentUser.location}</ListGroupItem>
            </ListGroup>
            <Button variant="outline-secondary" onClick={handleShow}>Edit Profile</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
      </>
    </>
  )
}

export default ProfilePage
