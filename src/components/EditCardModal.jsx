import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { editItem } from '../redux/items/items'
import { useDispatch } from 'react-redux'

import '../styles.css'

const ITEM_TYPES = [
  { id: 0, name: 'Kitchen' },
  { id: 1, name: 'Tools' },
  { id: 2, name: 'Outdoors' },
  { id: 3, name: 'DIY' }
]

const LOCATIONS = [
  { id: 0, name: 'UBC Campus' }
]

export default function EditCardModal (props) {
  const dispatch = useDispatch()

  const itemTypeDropdowns = ITEM_TYPES.map((type) => {
    return <option key={type.id}>{type.name}</option>
  })

  const locationDropdowns = LOCATIONS.map((location) => {
    return <option key={location.id}>{location.name}</option>
  })

  const [switchIsAvailable, setSwitchIsAvailable] = useState(true)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  const handleClose = () => {
    props.setShow(false)
  }

  return (
    <>
      <Modal
        show={props.modalOpen}
        onHide={() => props.setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control type="text" placeholder={props.name} value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Row>
              <Form.Group as={Col} sm >
                <Form.Label>Type</Form.Label>
                <Form.Select placeholder={props.type} value={type} onChange={(e) => setType(e.target.value)}>
                  <option>Select an item type...</option>
                  {itemTypeDropdowns}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} sm >
                <Form.Label>Location</Form.Label>
                <Form.Select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option>Select a location...</option>
                  {locationDropdowns}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} xs={8} controlId="formFileDisabled" >
                <Form.Label>Upload an image</Form.Label>
                <Form.Control type="file" disabled />
              </Form.Group>
              <Form.Group as={Col} sm className="d-flex align-items-end mb-3">
                <Form.Switch
                  checked={switchIsAvailable}
                  onChange={() => setSwitchIsAvailable(!switchIsAvailable)}
                  label={'Make item available'}
                  className={switchIsAvailable ? '' : 'text-muted'} />
              </Form.Group>
            </Row>
            <Form.Group >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder={props.description} value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="me-1"
              onClick={(e) => {
                e.preventDefault()
                dispatch(editItem({
                  name,
                  type,
                  location,
                  description
                }))
                handleClose()
              }}>Submit Changes</Button>
            <Button variant="danger" type="reset">Reset</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
