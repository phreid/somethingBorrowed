import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Stack } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import CounterInput from 'react-bootstrap-counter'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import { addRequestAsync } from '../../redux/requests/thunks'

import '../../styles.css'

export default function RequestModal (props) {
  const [dateNeededOn, setDateNeededOn] = useState(new Date())
  const [reqestorNotes, setReqestorNotes] = useState('')
  const [daysNeededFor, setDaysNeededFor] = useState(1)
  const [showAlert, setShowAlert] = useState(false)

  const dispatch = useDispatch()

  const handleClose = () => {
    props.setShow(false)
    setShowAlert(false)
  }

  const handleReset = () => {
    setDateNeededOn(new Date())
    setReqestorNotes('')
    setDaysNeededFor(1)
  }

  const isDateBeforeToday = (date) => {
    return new Date(date.toDateString()) < new Date(new Date().toDateString())
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isDateBeforeToday(dateNeededOn)) {
      setShowAlert(true)
      return
    }

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
          <Modal.Title className='request-item-heading'>Request Item</Modal.Title>
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
                <CounterInput className='request-counter' value={daysNeededFor} min={1} max={100} onChange={(value) => setDaysNeededFor(value)} />
              </Form.Group>
            </Row> <br/>
            <Row>
              <Form.Group as={Col} sm >
                <Form.Label>What day do you need the item?</Form.Label>
                <Calendar className='request-calendar' value={dateNeededOn} onChange={(value) => {
                  setShowAlert(false)
                  setDateNeededOn(value)
                }} />
                {showAlert
                  ? (
                    <Alert className='request-alert-popup' variant="warning" onClose={() => setShowAlert(false)} dismissible>
            Please select a future date
                    </Alert>
                  )
                  : null }
              </Form.Group>
              <Form.Group >
                <Form.Label>Additional notes</Form.Label>
                <Form.Control className='request-desc-input' as="textarea" rows={3} placeholder="Tell the owner why you would like to borrow this item" value={reqestorNotes}
                  onChange={(e) => setReqestorNotes(e.target.value)}></Form.Control>
              </Form.Group>
            </Row>
            <Stack gap={2}>
              <Button className='request-form-button' type="submit"
                onClick={handleSubmit}>Submit Request</Button>
              <Button className='request-form-button' type="reset" onClick={handleReset}>Reset</Button>
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
