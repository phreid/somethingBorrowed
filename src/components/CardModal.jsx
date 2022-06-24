import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { addItem, closeModal } from '../redux/items/items'
import { useDispatch } from 'react-redux'

const ITEM_TYPES = [
  { id: 0, name: 'Kitchen' },
  { id: 1, name: 'Tools' },
  { id: 2, name: 'Outdoors' },
  { id: 3, name: 'DIY' }
]

const LOCATIONS = [
  { id: 0, name: 'UBC Campus' }
]

export default function CardModal (props) {
  const [close, setClose] = useState(props.modalOpen)

  const dispatch = useDispatch()

  const handleClose = () => {
    if (close === true) {
      return
    }
    console.log(setClose(close))
    dispatch(closeModal(props))
  }

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

  return (
    <>
      <Modal
        show={props.modalOpen}
        backdrop="static"
        keyboard={false}
      >
        <h1>Edit Item Details</h1>
        <Button variant="primary" onClick={handleClose}>Close</Button>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" placeholder="Enter the name of your item" value={props.name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Row>
            <Form.Group as={Col} sm className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select value={props.type} onChange={(e) => setType(e.target.value)}>
                <option>Select an item type...</option>
                {itemTypeDropdowns}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} sm className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Select value={props.location} onChange={(e) => setLocation(e.target.value)}>
                <option>Select a location...</option>
                {locationDropdowns}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} xs={8} controlId="formFileDisabled" className="mb-3">
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
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter a description of your item" value={props.description}
              onChange={(e) => setDescription(e.target.value)}></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="me-1"
            onClick={(e) => {
              e.preventDefault()
              dispatch(addItem({
                name,
                type,
                location,
                description
              }))
            }}>Submit</Button>
          <Button variant="danger" type="reset">Reset</Button>
        </Form>
      </Modal>
    </>
  )
}
