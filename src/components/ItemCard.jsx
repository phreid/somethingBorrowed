import React, { useState } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteItem, updateStatus } from '../redux/items/items'

import CardModal from './CardModal'
import placeholder from '../images/placeholder.jpg'

function ItemCard (props) {
  const [borrowed, setBorrowed] = useState(false)
  const [buttonText, setButtonText] = useState('Borrow Item')
  const [editOpen, setEditOpen] = useState(props.modalOpen)

  const dispatch = useDispatch()

  function handleBorrowItem () {
    if (borrowed === true) {
      return
    }

    setBorrowed(true)
    setButtonText('Borrowed')
    dispatch(updateStatus(props))
  }

  function handleEditItem () {
    if (editOpen === true) {
      return
    }

    setEditOpen(true)
  }

  function handleCloseModal () {
    setEditOpen(false)
  }

  return (
    <Card className="item-card" style={{ width: '' }}>
      <Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
        <div className="col-md-4">
          <Card.Img className="item-img" src={props.image || placeholder } />
        </div>
        <div className="col-md-8">
          {props.edit ? <Button onClick={handleEditItem} >Edit Item</Button> : null }
          <CardModal modalOpen={editOpen} setShow={handleCloseModal} />
          <Card.Title className="item-name">{props.name}</Card.Title>
          <Button variant="outline-danger" size="sm" className="position-absolute top-0 end-0" onClick={(e) => dispatch(deleteItem(props))}>Delete</Button>
          <br/>
          <Card.Title className="item-name"><strong>{props.name}</strong></Card.Title>
          <br/>
          <Card.Text className="item-description">
            <strong>Description:</strong> {props.description}
          </Card.Text >
          <Card.Text className="item-type">
            <strong>Type:</strong> {props.type}
          </Card.Text>
          <Card.Text className="item-location">
            <strong>Location:</strong> {props.location}
          </Card.Text>
          <Card.Text className="item-status">
            <strong>Status:</strong> {props.status}
          </Card.Text>
          {props.borrow ? <Button disabled={borrowed} onClick={handleBorrowItem}>{buttonText}</Button> : null }
        </div>
      </Row>
    </Card>
  )
}

export default ItemCard
