import NavBar from './NavBar'
import { Button, Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import profile from '../images/profile.png'
import { useDispatch, useSelector } from 'react-redux'
import { React, useEffect, useState } from 'react'
import { getCurrentUserAsync } from '../redux/users/thunks'
import EditUserForm from './EditUserForm'
import DeleteUserForm from './DeleteUserForm'

function ProfilePage (props) {
  const userId = useSelector(state => state.user.currentUserId)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUserAsync(userId))
  }, [dispatch])

  const currentUser = useSelector(state => state.user.currentUser)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const handleCloseEdit = () => setShowEdit(false)
  const handleShowEdit = () => setShowEdit(true)
  const handleCloseDelete = () => setShowDelete(false)
  const handleShowDelete = () => setShowDelete(true)
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
            <Button variant="outline-secondary" onClick={handleShowEdit}>Edit Profile</Button>
            <Button variant="outline-danger" onClick={handleShowDelete}>Delete Profile</Button>
          </Card.Body>

          <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditUserForm currentUser={currentUser}/>
            </Modal.Body>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
          </Modal>

          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DeleteUserForm currentUser={userId}/>
            </Modal.Body>
            <Button variant="secondary" onClick={handleCloseDelete}>
              Close
            </Button>
          </Modal>
        </Card>
      </>
    </>
  )
}

export default ProfilePage
