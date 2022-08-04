import { useState } from 'react'
import { Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from 'react-redux'

import { Rating } from '@mui/material'

import { rateItemAsync } from '../../redux/items/thunks'

import '../../styles.css'

export default function EditRatingModal (props) {
  const dispatch = useDispatch()

  const [rating, setRating] = useState(0)
  const [ratingComments, setRatingComments] = useState(props.ratingComments)

  const handleClose = () => {
    props.setShowRatingModal(false)
  }

  const handleReset = () => {
    setRating(0)
    setRatingComments('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (rating === 'Select item rating...') {
      alert('Please select a valid rating')
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
          <Modal.Title>Add Item Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Col} sm >
              <Form.Label>Rating</Form.Label>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue)
                }}
              />
            </Form.Group>
            <Form.Group >
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows={3} value={ratingComments}
                onChange={(e) => setRatingComments(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="me-1"
              onClick={handleSubmit}>Submit Changes</Button>
            <Button variant="danger" type="reset" onClick={handleReset}>Reset</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
