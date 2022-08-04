import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import CounterInput from 'react-bootstrap-counter'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import { addRequestAsync } from '../../redux/requests/thunks'

import '../../styles.css'

export default function RequestModal (props) {
  const [dateNeededOn, setDateNeededOn] = useState(new Date())
  const [reqestorNotes, setReqestorNotes] = useState('')
  const [daysNeededFor, setDaysNeededFor] = useState(1)

  const dispatch = useDispatch()

  const handleClose = () => {
    props.setShow(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const adjustedDate = dateNeededOn.toDateString()

    const request = {
      item: props.item,
      itemOwner: props.owner,
      requestor: props.requestor,
      reqestorNotes,
      daysNeededFor,
      dateNeededOn: adjustedDate
    }

    dispatch(addRequestAsync(request))
    setDateNeededOn(new Date())
    setDaysNeededFor(1)
    setReqestorNotes('')
    handleClose()
  }

  return (
    <>
      <Modal
        size="lg"
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
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} sm >
                <Form.Label>How many days would you like to borrow it for?</Form.Label>
                <CounterInput value={daysNeededFor} min={1} max={100} onChange={(value) => setDaysNeededFor(value)} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} sm >
                <Form.Label>What day do you need the item?</Form.Label>
                <Calendar value={dateNeededOn} onChange={(value) => setDateNeededOn(value)} />
              </Form.Group>
              <Form.Group >
                <Form.Label>Additional notes</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Tell the owner why you would like to borrow this item" value={reqestorNotes}
                  onChange={(e) => setReqestorNotes(e.target.value)}></Form.Control>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit" className="me-1"
              onClick={handleSubmit}>Submit Request</Button>
            <Button variant="danger" type="reset">Reset</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
