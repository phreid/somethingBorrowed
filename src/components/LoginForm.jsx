import { useState } from 'react'
import { Form, Button, Stack } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/users/user'

export default function LoginForm () {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    // Just doing fake login so don't even check the password
    console.log(password)

<<<<<<< HEAD
    localStorage.setItem('user', username)
=======
>>>>>>> b82c9b2897c171018e34d62e647f4959c7c5c251
    dispatch(loginUser({ username, isLoggedIn: true }))
    // When we have react-router set up, can uncomment the line below (and maybe fix the path)
    // so the login button redirects to the home page
    // useNavigate('/')
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
