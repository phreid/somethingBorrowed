import React, { useState } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import EditCardModal from './EditCardModal'
import EditRatingModal from './EditRatingModal'

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
    return state.items.list.find((item) => item._id === props.id).status === STATUS.NOT_AVAILABLE
  })
  const available = useSelector(state => {
    return state.items.list.find((item) => item._id === props.id).status === STATUS.AVAILABLE
  })
  const [buttonText, setButtonText] = useState(available ? 'Borrow Item' : unavailable ? 'Not available' : 'Borrowed')
  const [editOpen, setEditOpen] = useState(props.modalOpen)
  const [unavailableItemText, setUnavailableItemText] = useState(unavailable ? 'Mark as available' : 'Mark as unavailable')
  const [editRatingModal, setEditRatingModal] = useState(props.ratingOpen)

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

  function handleRateItem () {
    console.log('item card: ' + props.id)
    if (editRatingModal === true) {
      return
    }
    setEditRatingModal(true)
  }

  function handleCloseModal () {
    setEditOpen(false)
  }

  function handleCloseRatingModal () {
    setEditRatingModal(false)
  }

  function handleMarkItemReturned () {
    const item = {
      status: STATUS.AVAILABLE,
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

    if (props.status === STATUS.NOT_AVAILABLE) {
      item = {
        status: STATUS.AVAILABLE,
        id: props.id,
        name: props.name,
        type: props.type,
        description: props.description,
        location: props.location
      }
      dispatch(updateItemAsync(item))
      setUnavailableItemText('Mark not available')
    } else {
      item = {
        status: STATUS.NOT_AVAILABLE,
        id: props.id,
        name: props.name,
        type: props.type,
        description: props.description,
        location: props.location
      }
      dispatch(updateItemAsync(item))
      setUnavailableItemText('Mark as available')
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
          <EditCardModal modalOpen={editOpen} setShow={handleCloseModal} id={props.id} rating={props.rating} ratingComments={props.ratingComments} />
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
          {props.rating
            ? (
              <>
                <Card.Text className="card-text">
                Rating is based on a scale of 1 to 5 where 5 is the highest quality
                </Card.Text>
                <Card.Text className="card-text">
                  <strong>Rating:</strong> {props.rating}
                </Card.Text>
                <Card.Text className="card-text">
                  <strong>Comments:</strong> {props.ratingComments}
                </Card.Text>
                <Button variant="outline-primary" size="sm" className="card-buttons" onClick={handleRateItem}>
                Rate Item
                </Button>
              </>
            )
            : null }
          <EditRatingModal ratingOpen={editRatingModal} setShowRatingModal={handleCloseRatingModal} id={props.id} name={props.name} description={props.description} type={props.type} location={props.location} />
          {props.borrow
            ? (
              <Button disabled={!available} variant="outline-primary" size="sm" onClick={handleBorrowItem}>
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
