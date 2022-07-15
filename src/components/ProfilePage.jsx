import NavBar from './NavBar'
import { Button, Card, Form, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import profile from '../images/profile.png'
import { useDispatch, useSelector } from 'react-redux'
import { React, useEffect, useState } from 'react'
import { deleteUserAsync, getCurrentUserAsync, updateUserAsync } from '../redux/users/thunks'
import { LOCATIONS } from '../constants'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage () {
  const userId = useSelector(state => state.user.user)
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')

  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const handleCloseEdit = () => setShowEdit(false)
  const handleShowEdit = () => setShowEdit(true)
  const handleCloseDelete = () => setShowDelete(false)
  const handleShowDelete = () => setShowDelete(true)

  useEffect(() => {
    dispatch(getCurrentUserAsync(userId))
  }, [dispatch])

  const locationDropdowns = Object.values(LOCATIONS).map((location) => {
    return <option key={location}>{location}</option>
  })

  const updatedUser = {
    userId,
    username,
    password,
    bio,
    email,
    location
  }

  const onSubmitEdit = (event) => {
    event.preventDefault()
    dispatch(updateUserAsync(updatedUser))
    handleCloseEdit()
  }

  const clearForm = () => {
    setUsername('')
    setPassword('')
    setBio('')
    setEmail('')
    setLocation('')
  }

  const onSubmitDelete = (event) => {
    event.preventDefault()
    dispatch(deleteUserAsync(userId)).unwrap()
    navigate('/')
  }

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
            <Button variant="outline-danger" onClick={handleShowDelete}>Delete Account</Button>
          </Card.Body>

          <Modal id="edit-profile-modal" show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Update Username</Form.Label>
                    <Form.Control
                      type="input"
                      placeholder="username"
                      autoFocus
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Update Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      autoFocus
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Update Bio</Form.Label>
                    <Form.Control as="textarea" rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Update Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Label>Update Location</Form.Label>
                  <Form.Select value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option>Select item location...</option>
                    {locationDropdowns}
                  </Form.Select>
                  <br/>
                  <Button variant="success" type="submit" onClick={onSubmitEdit}>
                    Save and Update
                  </Button>
                  <Button variant="danger" type="button" onClick={clearForm}>Reset</Button>
                </Form>
              </div>
            </Modal.Body>
          </Modal>

          <Modal id="delete-profile-modal" show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <strong>Are you sure you want to delete this account?</strong>
                <div>
                  <Button variant="danger" onClick={onSubmitDelete}>Yes</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </Card>
      </>
    </>
  )
}
