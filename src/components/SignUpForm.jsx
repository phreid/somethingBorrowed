import { Form, Button, Stack } from 'react-bootstrap'

export default function SignUpForm () {
  const handleSubmit = (event) => {
    event.preventDefault()

    // When we have react-router set up, can uncomment the line below (and maybe fix it) for
    // a fake login where pressing the signup button just redirects to the home page
    // useNavigate('/home')
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Stack gap={4} className="mx-auto">
        <Stack gap={2}>
          <Form.Control type="email" placeholder="Email" />
          <Form.Control type="text" placeholder="User name" />
          <Form.Control type="password" placeholder="Password" />
        </Stack>
        <Stack gap={2}>
          <Button variant="primary" type="submit">
            Sign up
          </Button>
        </Stack>
      </Stack>
    </Form>
    </>
  )
}
