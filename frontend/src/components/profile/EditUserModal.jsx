import { React, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserAsync } from '../../redux/users/thunks'

export default function EditUserModal (props) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const userId = useSelector(state => state.user.user)

  const [username, setUsername] = useState(currentUser.username)
  useEffect(() => {
    setUsername(currentUser.username)
  }, [currentUser.username])

  const [password, setPassword] = useState(currentUser.password)
  useEffect(() => {
    setPassword(currentUser.password)
  }, [currentUser.password])

  const [bio, setBio] = useState(currentUser.bio)
  useEffect(() => {
    setBio(currentUser.bio)
  }, [currentUser.bio])

  const [email, setEmail] = useState(currentUser.email)
  useEffect(() => {
    setEmail(currentUser.email)
  }, [currentUser.email])

  const handleClose = () => {
    props.setShowEditUserModal(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(updateUserAsync({
      userId,
      username,
      password,
      bio,
      email
    })).unwrap()

    handleClose()
  }

  const clearForm = () => {
    setUsername(currentUser.username)
    setPassword(currentUser.password)
    setBio(currentUser.bio)
    setEmail(currentUser.email)
  }

  return (
    <>
      <Modal
        show={props.editUserModalOpen}
        onHide={() => props.setShowEditUserModal(false)}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Update Username</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter new username"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Update Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Update Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter something about yourself!"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Update Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter new email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <br/>
            <div className='modal-buttons text-center' >
              <Button variant="success" type="submit">
                  Save and Update
              </Button>{'  '}
              <Button variant="danger" type="button" onClick={clearForm}>Reset</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
