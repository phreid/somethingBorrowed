import { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { useDispatch } from 'react-redux'

import { ITEM_TYPES } from '../../constants'
import { updateItemAsync } from '../../redux/items/thunks'

import '../../styles.css'

export default function EditItemModal (props) {
  const dispatch = useDispatch()

  const itemId = props.id

  const itemTypeDropdowns = Object.values(ITEM_TYPES).map((type) => {
    return <option key={type}>{type}</option>
  })
  const [name, setName] = useState(props.name)
  const [type, setType] = useState(props.type)
  const [description, setDescription] = useState(props.description)
  const [showAlert, setShowAlert] = useState(false)
  const [missingField, setMissingField] = useState('')

  const handleClose = () => {
    props.setShow(false)
  }

  const handleReset = () => {
    setName(props.name)
    setType(props.type)
    setDescription(props.description)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name === '') {
      setMissingField('item name')
      setShowAlert(true)
      return
    } else if (type === 'Select an item type...') {
      setMissingField('item type')
      setShowAlert(true)
      return
    }

    dispatch(updateItemAsync({
      id: itemId,
      name,
      type,
      description
    }))

    handleClose()
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
          <Modal.Title className='edit-item-modal-heading'>Edit Your Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control className='edit-item-modal-input' type="text" placeholder={props.name} value={name}
                onChange={(e) => {
                  setShowAlert(false)
                  setName(e.target.value)
                }}></Form.Control>
            </Form.Group>
            <Row>
              <Form.Group as={Col} sm >
                <Form.Label>Type</Form.Label>
                <Form.Select className='edit-item-modal-input' placeholder={props.type} value={type} onChange={(e) => {
                  setShowAlert(false)
                  setType(e.target.value)
                }}>
                  <option>Select an item type...</option>
                  {itemTypeDropdowns}
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group >
              <Form.Label>Description</Form.Label>
              <Form.Control className='edit-item-modal-input' as="textarea" rows={3} placeholder={props.description} value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <br/>
            <Stack gap={2}>
              <Button className='edit-item-form-button' type="submit"
                onClick={handleSubmit}>Submit Changes</Button>
              <Button className='edit-item-form-button' type="reset" onClick={handleReset}>Reset</Button>
            </Stack>
            {showAlert
              ? (
                <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
            Missing a required field: {missingField}
                </Alert>
              )
              : null }
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
