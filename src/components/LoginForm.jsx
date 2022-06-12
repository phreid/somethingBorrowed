import { Form, Button, Stack } from 'react-bootstrap'

export default function LoginForm () {
  const handleSubmit = (event) => {
    event.preventDefault()

    // When we have react-router set up, can uncomment the line below (and maybe fix it) for
    // a fake login where pressing the login button just redirects to the home page
    // useNavigate('/home')
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Stack gap={4} className="mx-auto">
        <Stack gap={2}>
          <Form.Control type="email" placeholder="Email" />
          <Form.Control type="password" placeholder="Password" />
        </Stack>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Stack>
    </Form>
    </>
  )
}
