import NavBar from './NavBar'
import { Button, Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import profile from '../images/profile.png'
import { useDispatch, useSelector } from 'react-redux'
import { React, useEffect, useState } from 'react'
import { getCurrentUserAsync } from '../redux/users/thunks'
import EditUserForm from './EditUserForm'
import DeleteUserAccountForm from './DeleteUserAccountForm'

export default function ProfilePage (props) {
  const userId = useSelector(state => state.user.user)
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUserAsync(userId))
  }, [dispatch])

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
            <Card.Img className="profile-img" variant="center" width="100" src={profile} />
            <ListGroup className="list-group-flush center">
              <ListGroupItem><Card.Title>{currentUser.username}</Card.Title></ListGroupItem>
              <ListGroupItem><Card.Text>{currentUser.bio}</Card.Text></ListGroupItem>
              <ListGroupItem>{currentUser.email}</ListGroupItem>
              <ListGroupItem>{currentUser.location}</ListGroupItem>
            </ListGroup>
            <br/>
            <Button variant="outline-secondary" onClick={handleShowEdit}>Edit Profile</Button>{' '}
            <Button variant="outline-danger" onClick={handleShowDelete}>Delete Account</Button>
          </Card.Body>

          <Modal show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditUserForm currentUser={currentUser}/>
            </Modal.Body>
          </Modal>

          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DeleteUserAccountForm currentUser={userId}/>
            </Modal.Body>
          </Modal>
        </Card>
      </>
    </>
  )
}
