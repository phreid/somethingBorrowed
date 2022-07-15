import { React, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LOCATIONS } from '../constants'
import { updateUserAsync } from '../redux/users/thunks'

export default function EditUserForm () {
  const userId = useSelector(state => state.user.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')

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

  const dispatch = useDispatch()

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(updateUserAsync(updatedUser))
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
        <Button variant="success" type="submit" onClick={onSubmit}>
          Save and Update
        </Button>
        <Button variant="danger" type="button" onClick={clearForm}>Reset</Button>
      </Form>
    </div>
  )
}
