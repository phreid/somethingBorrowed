import { useState } from 'react'
import { Form, Button, Stack } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/users/user'
import { useNavigate } from 'react-router-dom'

export default function LoginForm () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    // Just doing fake login so don't even check the password
    console.log(password)

    localStorage.setItem('user', username)
    dispatch(loginUser({ username, isLoggedIn: true }))
    // When we have react-router set up, can uncomment the line below (and maybe fix the path)
    // so the login button redirects to the home page
    navigate('/marketplace')
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
