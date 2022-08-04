import React, { useState } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { useDispatch } from 'react-redux'

import { STATUS } from '../../constants'
import noimage from '../../images/defaultImages/noimage.png'
import { deleteItemAsync, updateItemAsync } from '../../redux/items/thunks'
import EditItemModal from '../my-items/EditItemModal'
import EditRatingModal from '../my-items/EditRatingModal'
import RequestModal from '../requests/RequestModal'

function ItemCard (props) {
  let available = false
  let borrowed = false
  let unavailable = false
  if (props.status === STATUS.BORROWED) {
    borrowed = true
  } else if (props.status === STATUS.AVAILABLE) {
    available = true
  } else {
    unavailable = true
  }
  const [buttonText, setButtonText] = useState(available ? 'Request Item' : unavailable ? 'Not available' : 'Borrowed')
  const [editOpen, setEditOpen] = useState(props.modalOpen)
  const [unavailableItemText, setUnavailableItemText] = useState(unavailable ? 'Mark as available' : 'Mark as unavailable')
  const [editRatingModal, setEditRatingModal] = useState(props.ratingOpen)
  const [requestModalOpen, setRequestModalOpen] = useState(props.requestOpen)

  const dispatch = useDispatch()

  function handleRequestItem () {
    if (requestModalOpen === true) {
      return
    }

    setRequestModalOpen(true)
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

  function handleCloseRequestModal () {
    setRequestModalOpen(false)
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

  const getResizedImageUrl = (url, width, height) =>
    url.replace('/upload', `/upload/w_${width},h_${height}`)

  return (
    <Card className="item-card">
      <Row>
        <div className="col-md-4">
          <Card.Img
            className="item-img"
            src={
              props.image
                ? getResizedImageUrl(props.image.url, 300, 250)
                : noimage
            }
          />
        </div>
        <div className="col-md-8">
          {props.edit
            ? (
              <Button className='item-card-edit-button' variant="outline-primary" size="sm" onClick={handleEditItem}>
                Edit Item
              </Button>
            )
            : null }
          {props.delete
            ? (
              <Button className='item-card-delete-button' variant="outline-danger" size="sm" onClick={handleDeleteItem}>
                Delete
              </Button>
            )
            : null }
          <EditItemModal modalOpen={editOpen} setShow={handleCloseModal} id={props.id} name={props.name} description={props.description} type={props.type} location={props.location} />
          <Card.Title className="title"><strong>{props.name}</strong></Card.Title>
          {props.borrowedDate
            ? (
              <Card.Text className="card-text">
                <strong>Last borrowed on: </strong>
                {new Date(props.borrowedDate).toLocaleString()}
              </Card.Text>
            )
            : null }
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
          <OverlayTrigger
            key='top'
            placement='left'
            overlay={
              <Tooltip>
              Rating is based on a scale of 1 to 5 where 5 is the highest quality
              </Tooltip>
            }
          >
            <Card.Text className="card-text">
              <strong id='rating-label'>Rating:</strong> {props.rating}
            </Card.Text>
          </OverlayTrigger>
          <Card.Text className="card-text">
            <strong>Comments:</strong> {props.ratingComments}
          </Card.Text>
          {props.editRating
            ? (
              <Button variant="outline-primary" size="sm" className="card-buttons" onClick={handleRateItem}>
                Rate Item
              </Button>
            )
            : null }
          <EditRatingModal ratingOpen={editRatingModal} setShowRatingModal={handleCloseRatingModal} id={props.id} rating={props.rating} ratingComments={props.ratingComments} />
          {props.borrow
            ? (
              <Button disabled={!available} variant="outline-primary" size="sm" onClick={handleRequestItem}>
                {buttonText}
              </Button>
            )
            : null }
          <RequestModal requestOpen={requestModalOpen} setShow={handleCloseRequestModal} id={props.id} name={props.name} owner={props.owner} requestor={props.loggedInUser} item={props.id} />
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
