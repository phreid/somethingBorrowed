import LoginForm from './LoginForm'
import { Row, Col, Stack, Container, Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import SignUpForm from './SignUpForm'

export default function LoginPage () {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  return (
    <>
      <Container >
        <Row className="vh-100 align-items-center justify-content-center">
          <Col xs={12} lg={4}>
            <Stack gap={4}>
              <h2 className="mx-auto">Login</h2>
              <Stack gap={2}>
                <LoginForm />
                <Button variant="secondary" onClick={handleShow}>
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Welcome to Something Borrowed
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm />
        </Modal.Body>
      </Modal>
    </>
  )
}
