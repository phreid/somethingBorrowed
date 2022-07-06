import { useState } from 'react'
import { Form, Button, Stack } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginAsync } from '../redux/users/thunks'

export default function LoginForm () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await dispatch(loginAsync({ username, password })).unwrap()
      navigate('/marketplace')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4} className="mx-auto">
          <Stack gap={2}>
            <Form.Control type="text" placeholder="Username" required onChange={e => setUsername(e.target.value)}/>
            <Form.Control type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
          </Stack>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Stack>
      </Form>
    </>
  )
}
