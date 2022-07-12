import React, { useState } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import EditCardModal from './EditCardModal'
import diy from '../images/defaultImages/diy.jpg'
import kitchen from '../images/defaultImages/kitchen.jpg'
import outdoors from '../images/defaultImages/outdoors.jpg'
import tools from '../images/defaultImages/tools.jpg'
import { borrowItemAsync, deleteItemAsync, updateItemAsync } from '../redux/items/thunks'
import { ITEM_TYPES, STATUS } from '../constants'

function ItemCard (props) {
  const borrowed = useSelector(state => {
    return state.items.list.find((item) => item._id === props.id).status === STATUS.BORROWED
  })
  const unavailable = useSelector(state => {
    return state.items.list.find((item) => item._id === props.id).status === 'Not available'
  })
  const [buttonText, setButtonText] = useState(borrowed ? 'Borrowed' : 'Borrow Item')
  const [editOpen, setEditOpen] = useState(props.modalOpen)
  const [unavailableItemText, setUnavailableItemText] = useState(unavailable ? 'Mark as available' : 'Mark as unavailable')

  const dispatch = useDispatch()

  function handleBorrowItem () {
    setButtonText('Borrowed')
    dispatch(borrowItemAsync(props))
  }

  function handleDeleteItem () {
    dispatch(deleteItemAsync(props))
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

  function handleMarkItemReturned () {
    const item = {
      status: 'Available',
      id: props.id,
      name: props.name,
      type: props.type,
      description: props.description,
      location: props.location
    }

    setButtonText('Available')
    dispatch(updateItemAsync(item))
  }

  function handleUnavailableStatus () {
    let item

    if (props.status === 'Not available') {
      setUnavailableItemText('Mark not available')
      item = {
        status: 'Available',
        id: props.id,
        name: props.name,
        type: props.type,
        description: props.description,
        location: props.location
      }
      dispatch(updateItemAsync(item))
    } else {
      setUnavailableItemText('Mark as available')
      item = {
        status: 'Not available',
        id: props.id,
        name: props.name,
        type: props.type,
        description: props.description,
        location: props.location
      }
      dispatch(updateItemAsync(item))
    }
  }

  return (
    <Card className="item-card" style={{ width: '' }}>
      <Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
        <div className="col-md-4">
          <Card.Img className="item-img" src={
            ((props.type === ITEM_TYPES.DIY) && diy) ||
            ((props.type === ITEM_TYPES.KITCHEN) && kitchen) ||
            ((props.type === ITEM_TYPES.OUTDOORS) && outdoors) ||
            ((props.type === ITEM_TYPES.TOOLS) && tools)
          } />
        </div>
        <div className="col-md-8">
          {props.edit
            ? (
              <Button variant="outline-primary" size="sm" className="card-buttons" onClick={handleEditItem}>
                Edit Item
              </Button>
            )
            : null }
          {props.delete
            ? (
              <Button variant="outline-danger" size="sm" className="card-buttons" onClick={handleDeleteItem}>
                Delete
              </Button>
            )
            : null }
          <EditCardModal modalOpen={editOpen} setShow={handleCloseModal} id={props.id} name={props.name} description={props.description} type={props.type} location={props.location} />
          <Card.Title className="item-name"><strong>{props.name}</strong></Card.Title>
          <Card.Text className="card-text">
            <strong>Description:</strong> {props.description}
          </Card.Text >
          <Card.Text className="card-text">
            <strong>Type:</strong> {props.type}
          </Card.Text>
          <Card.Text className="card-text">
            <strong>Location:</strong> {props.location}
          </Card.Text>
          <Card.Text className="card-text">
            <strong>Status:</strong> {props.status}
          </Card.Text>
          {props.borrow
            ? (
              <Button disabled={borrowed} variant="outline-primary" size="sm" onClick={handleBorrowItem}>
                {buttonText}
              </Button>
            )
            : null }
          {props.changeToReturned
            ? (
              <Button className="card-buttons" disabled={!borrowed} variant="outline-primary" size="sm" onClick={handleMarkItemReturned}>
                 Mark as returned
              </Button>
            )
            : null }
          {props.toggleUnavailable
            ? (
              <Button className="card-buttons" disabled={borrowed} variant="outline-primary" size="sm" onClick={handleUnavailableStatus}>
                {unavailableItemText}
              </Button>
            )
            : null }
        </div>
      </Row>
    </Card>
  )
}

export default ItemCard
