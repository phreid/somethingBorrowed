import { useState } from 'react'
import { Row, Stack, Container, Button, Modal, Alert } from 'react-bootstrap'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import logo from '../../images/logo.svg'
import '../../styles.css'

export default function LoginPage () {
  const [showModal, setShowModal] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  return (
    <Container>
      <Row className='base align-items-center justify-content-center'>
        <img className='logo-image' src={logo} alt='logo'/>
        <Stack gap={2}>
          <LoginForm className='login-form' onLoginError={() => setShowAlert(true)} />
          <Button className='login-page-button' onClick={handleShow}>
                  Sign up
          </Button>
        </Stack>
        {
          showAlert &&
                <Alert className='p-2' variant='warning'>
                  Incorrect username.
                </Alert>
        }
      </Row>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='signup-form' id="contained-modal-title-vcenter">
              Welcome to Something Borrowed
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm />
        </Modal.Body>
      </Modal>
    </Container>
  )
}
