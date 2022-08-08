import { useState, createRef } from 'react'
import { Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { useDispatch } from 'react-redux'
import { ITEM_TYPES, STATUS } from '../../constants'
import { addItemAsync } from '../../redux/items/thunks'

export default function AddItemForm (props) {
  const itemTypeDropdowns = Object.values(ITEM_TYPES).map((type) => {
    return <option key={type}>{type}</option>
  })

  const [switchIsAvailable, setSwitchIsAvailable] = useState(true)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [missingField, setMissingField] = useState('')

  const fileInput = createRef()

  const dispatch = useDispatch()

  const handleReset = () => {
    setName('')
    setType('')
    setDescription('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name === '') {
      setMissingField('item name')
      setShowAlert(true)
      return
    } else if (type === '') {
      setMissingField('item type')
      setShowAlert(true)
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('type', type)
    formData.append('description', description === '' ? 'No description yet' : description)
    formData.append('status', switchIsAvailable ? STATUS.AVAILABLE : STATUS.NOT_AVAILABLE)
    formData.append('image', fileInput.current.files[0])

    dispatch(addItemAsync(formData))
    setName('')
    setType('')
    setDescription('')
    fileInput.current.value = null
  }

  return (
    <>
      <h2>Lend a New Item</h2>
      <Form className="form" encType="multipart/form-data">
        <Form.Group className="mb-3">
          <Form.Label>Item Name</Form.Label>
          <Form.Control className="item-input" type="text" placeholder="Enter item name" value={name}
            onChange={(e) => {
              setShowAlert(false)
              setName(e.target.value)
            }}></Form.Control>
        </Form.Group>
        <Row>
          <Form.Group as={Col} sm className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select value={type} onChange={(e) => {
              setShowAlert(false)
              setType(e.target.value)
            }}>
              <option>Select item type...</option>
              {itemTypeDropdowns}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} xs={8} controlId="formFileDisabled" className="mb-3">
            <Form.Label>Upload an image</Form.Label>
            <Form.Control
              type="file"
              ref={fileInput} />
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
          <Form.Control className="item-input" as="textarea" rows={3} placeholder="Enter item description" value={description}
            onChange={(e) => setDescription(e.target.value)}></Form.Control>
        </Form.Group>
        <Button variant="outline-primary" type="submit" className="me-1 button"
          onClick={handleSubmit}>Submit</Button>
        <Button variant="outline-danger" type="reset" className="button" onClick={handleReset}>Reset</Button>
        {showAlert
          ? (
            <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
            Missing a required field: {missingField}
            </Alert>
          )
          : null }
      </Form>
    </>
  )
}
