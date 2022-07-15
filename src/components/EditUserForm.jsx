import { React, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LOCATIONS } from '../constants'
import { updateUserAsync } from '../redux/users/thunks'

export default function EditUserForm () {
  const currentUser = useSelector(state => state.user.currentUser)
  const userId = useSelector(state => state.user.user)
  const [username, setUsername] = useState(currentUser.username)
  const [password, setPassword] = useState(currentUser.password)
  const [bio, setBio] = useState(currentUser.bio)
  const [email, setEmail] = useState(currentUser.email)
  const [location, setLocation] = useState(currentUser.location)

  const locationDropdowns = Object.values(LOCATIONS).map((location) => {
    return <option key={location}>{location}</option>
  })

  const dispatch = useDispatch()

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
  }

  const clearForm = () => {
    setUsername('')
    setPassword('')
    setBio('')
    setEmail('')
    setLocation('')
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Update Username</Form.Label>
          <Form.Control
            type="input"
            placeholder="username"
            required
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
            required
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
          <Form.Control
            as="textarea"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Update Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Label>Update Location</Form.Label>
        <Form.Select required value={location} onChange={(e) => setLocation(e.target.value)}>
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
    </div>
  )
}
