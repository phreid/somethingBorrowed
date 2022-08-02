import { React, useEffect, useState } from 'react'
import { Button, Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import profile from '../../images/profile.png'
import { getCurrentUserAsync } from '../../redux/users/thunks'
import NavBar from '../common/NavBar'
import DeleteUserAccountForm from './DeleteUserAccountForm'
import EditUserModal from './EditUserModal'
import Location from './Location'

export default function ProfilePage () {
  const userId = useSelector(state => state.user.user)
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUserAsync(userId))
  }, [dispatch, userId])

  const [showDelete, setShowDelete] = useState(false)
  const [editUserModal, setEditUserModal] = useState(false)

  function handleEditUser () {
    if (editUserModal === true) {
      return
    }
    setEditUserModal(true)
  }

  function handleCloseEditUserModal () {
    setEditUserModal(false)
  }

  const handleCloseDelete = () => setShowDelete(false)
  const handleShowDelete = () => setShowDelete(true)

  return (
    <>
      <NavBar />
      <>
        <Card className="profile-card" style={{ width: '' }}>
          <Card.Body className="text-center">
            <Card.Img className="profile-img" variant="center" width="100" src={profile} />
            <ListGroup className="list-group-flush right">
              <ListGroupItem><Card.Title>{currentUser.username}</Card.Title></ListGroupItem>
              <ListGroupItem><Card.Text>{currentUser.bio}</Card.Text></ListGroupItem>
              <ListGroupItem>{currentUser.email}</ListGroupItem>
            </ListGroup>
            <br/>
            <Button variant="outline-secondary" onClick={handleEditUser}>Edit Profile</Button>{' '}
            <Button variant="outline-danger" onClick={handleShowDelete}>Delete Account</Button>
            <br/>
            <div>
              <ListGroupItem>{currentUser.location}</ListGroupItem>
              <Location user={currentUser}></Location>
            </div>
          </Card.Body>

          <EditUserModal
            editUserModalOpen={editUserModal}
            setShowEditUserModal={handleCloseEditUserModal}
            user={currentUser}
          />

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
