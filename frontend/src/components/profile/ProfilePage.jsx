import { React, useEffect, useState } from 'react'
import { Button, Card, Modal, Container, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import profile from '../../images/profile.png'
import { getCurrentUserAsync } from '../../redux/users/thunks'
import NavBar from '../common/NavBar'
import DeleteUserAccountForm from './DeleteUserAccountForm'
import EditUserModal from './EditUserModal'
import Map from './Map'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
      <br/>
      <br/>
      <Container fluid className="single-column-profile-container">
        <Row>
          <Col xs={12} sm={12} md={4} lg={4}>
            <Image fluid rounded className="profile-img" width="60%" src={profile} />
            <hr/>
            <div className='button-div'>
              <Button className='profile-btn' onClick={handleEditUser}>Edit Profile</Button>{' '}
              <Button className='profile-btn' onClick={handleShowDelete}>Delete Account</Button>
            </div>
            <hr/>
            <Card.Title className='user-heading'>{currentUser.username}</Card.Title>
            <Card.Text className='profile-text'>{currentUser.bio}</Card.Text>
            <hr/>
            <Card.Text className='profile-text'>{currentUser.email}</Card.Text>
            <br/>
          </Col>

          <Col xs={12} sm={12} md={8} lg={8}>
            <Card.Text className='profile-loc-text'>{currentUser.location}</Card.Text>
            <hr/>
            <Map user={currentUser} />
          </Col>
        </Row>
      </Container>
      <EditUserModal
        editUserModalOpen={editUserModal}
        setShowEditUserModal={handleCloseEditUserModal}
        user={currentUser}
      />

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title className='user-heading'>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteUserAccountForm currentUser={userId}/>
        </Modal.Body>
      </Modal>

    </>
  )
}
