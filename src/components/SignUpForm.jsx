import { useState } from 'react'
import { Form, Button, Stack, Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginAsync, signUpAsync } from '../redux/users/thunks'

export default function SignUpForm () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [showAlert, setShowAlert] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await dispatch(signUpAsync({ username, password, email })).unwrap()
      await dispatch(loginAsync({ username, password })).unwrap()
      navigate('/marketplace')
    } catch (error) {
      if (error.status && error.status === 403) {
        setShowAlert(true)
      }
    }
  }

  return (
    <>
      <Stack gap={3}>
        <Form onSubmit={handleSubmit}>
          <Stack gap={4} className="mx-auto">
            <Stack gap={2}>
              <Form.Control type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
              <Form.Control type="text" placeholder="User name" required onChange={e => setUsername(e.target.value)}/>
              <Form.Control type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
            </Stack>
            <Stack gap={2}>
              <Button variant="primary" type="submit">
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Form>
        {
          showAlert &&
          <Alert className='p-2' variant='danger'>
            This username is already in use.
          </Alert>
        }

      </Stack>
    </>
  )
}
