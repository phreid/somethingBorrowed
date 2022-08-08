import { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import { useDispatch } from 'react-redux'

import { Rating } from '@mui/material'

import { rateItemAsync } from '../../redux/items/thunks'

import '../../styles.css'

export default function EditRatingModal (props) {
  const dispatch = useDispatch()

  const [rating, setRating] = useState(0)
  const [ratingComments, setRatingComments] = useState(props.ratingComments)
  const [showAlert, setShowAlert] = useState(false)

  const handleClose = () => {
    props.setShowRatingModal(false)
  }

  const handleReset = () => {
    setRating(0)
    setRatingComments('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (rating < 1) {
      setShowAlert(true)
      return
    }

    const item = {
      id: props.id,
      name: props.name,
      type: props.type,
      location: props.location,
      description: props.description,
      rating: rating.toString(),
      ratingComments
    }

    dispatch(rateItemAsync(item))

    handleClose()
    setRating(0)
  }

  return (
    <>
      <Modal
        show={props.ratingOpen}
        onHide={() => props.setShowRatingModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='add-item-rating'>Add Item Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Col} sm >
              <Form.Label>Rating</Form.Label><br/>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setShowAlert(false)
                  setRating(newValue)
                }}
              />
              {showAlert
                ? (
                  <Alert className='edit-rating-alert-popup' variant="warning" onClose={() => setShowAlert(false)} dismissible>
                      Please enter a rating
                  </Alert>
                )
                : null }
            </Form.Group>
            <Form.Group >
              <Form.Label>Comments</Form.Label>
              <Form.Control className='item-comment-input' as="textarea" rows={3} value={ratingComments}
                onChange={(e) => setRatingComments(e.target.value)}></Form.Control>
            </Form.Group>
            <Stack gap={2}>
              <Button className='edit-rating-form-button' type="submit"
                onClick={handleSubmit}>Submit Changes</Button>
              <Button className='edit-rating-form-button' type="reset" onClick={handleReset}>Reset</Button>
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
