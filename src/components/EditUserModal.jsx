import { React, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { LOCATIONS } from '../constants'
import { updateUserAsync } from '../redux/users/thunks'

export default function EditUserModal (props) {
  const userId = props.user._id
  const [username, setUsername] = useState(props.user.username)
  const [password, setPassword] = useState(props.user.password)
  const [bio, setBio] = useState(props.user.bio)
  const [email, setEmail] = useState(props.user.email)
  const [location, setLocation] = useState(props.user.location)

  const locationDropdowns = Object.values(LOCATIONS).map((location) => {
    return <option key={location}>{location}</option>
  })

  const dispatch = useDispatch()

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
      email,
      location
    })).unwrap()

    handleClose()
  }

  const clearForm = () => {
    setUsername('')
    setPassword('')
    setBio('')
    setEmail('')
    setLocation('')
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
                placeholder={props.user.username}
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
                placeholder={props.user.password}
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
                placeholder={props.user.bio}
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Update Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={props.user.email}
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Label>Update Location</Form.Label>
            <Form.Select
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}>
              <option>Select item location...</option>
              {locationDropdowns}
            </Form.Select>
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
