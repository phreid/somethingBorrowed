import { useState } from 'react'
import { Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import CounterInput from 'react-bootstrap-counter'

import '../../styles.css'

export default function RequestModal (props) {
  const [requestMessage, setRequestMessage] = useState('')

  const handleClose = () => {
    props.setShow(false)
  }

  const handleSubmit = (e) => {
    alert('request submitted')

    handleClose()
  }

  return (
    <>
      <Modal
        show={props.requestOpen}
        onHide={() => props.setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Request Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col} sm >
                <Form.Label>Item Name: <strong>{props.name}</strong></Form.Label>
                <Form.Label>How many days would you like to borrow it for?</Form.Label>
                <CounterInput value={1} min={1} max={100} />
                <br></br>
              </Form.Group>
            </Row>
            <Form.Group >
              <Form.Label>Additional notes</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Tell the owner why you would like to borrow this item" value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="me-1"
              onClick={handleSubmit}>Submit Request</Button>
            <Button variant="danger" type="reset">Reset</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}