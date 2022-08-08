import React, { useState, useEffect } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { useDispatch } from 'react-redux'

import { Rating } from '@mui/material'

import { STATUS, RATINGS } from '../../constants'
import noimage from '../../images/defaultImages/noimage.png'
import { deleteItemAsync, updateItemAsync } from '../../redux/items/thunks'
import EditItemModal from '../my-items/EditItemModal'
import EditRatingModal from '../my-items/EditRatingModal'
import RequestModal from '../requests/RequestModal'

const MAX_STRING_LENGTH = 50

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
  const [rating, setRating] = useState(0)
  const [descriptionDisplayed, setDescriptionDisplayed] = useState(props.description)
  const [ratingCommentsDisplayed, setRatingCommentsDisplayed] = useState(props.ratingComments)
  const [descTruncated, setDescTruncated] = useState(false)
  const [commentsTruncated, setCommentsTruncated] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (props.rating === RATINGS.UNRATED) {
      setRating(0)
    } else {
      setRating(parseInt(props.rating))
    }

    if (props.description.length > MAX_STRING_LENGTH) {
      setDescriptionDisplayed(props.description.substring(0, MAX_STRING_LENGTH - 3) + '...')
      setDescTruncated(true)
    } else {
      setDescriptionDisplayed(props.description)
    }

    if (props.ratingComments.length > MAX_STRING_LENGTH) {
      setRatingCommentsDisplayed(props.ratingComments.substring(0, MAX_STRING_LENGTH - 3) + '...')
      setCommentsTruncated(true)
    } else {
      setRatingCommentsDisplayed(props.ratingComments)
    }
  }, [props.rating, props.description, props.ratingComments])

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
      location: props.location,
      numberOfTimesBorrowed: props.times
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
        location: props.location,
        numberOfTimesBorrowed: props.times
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
        location: props.location,
        numberOfTimesBorrowed: props.times
      }
      dispatch(updateItemAsync(item))
      setUnavailableItemText('Mark as available')
    }
  }

  const getResizedImageUrl = (url, width, height) =>
    url.replace('/upload', `/upload/w_${width},h_${height}`)

  const style = props.featured ? 'featured-card' : 'item-card'
  return (
    <Card className={style}>
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
          <EditItemModal modalOpen={editOpen} setShow={handleCloseModal} id={props.id} name={props.name} description={props.description} type={props.type} location={props.location} />
          <Card.Title className="title"><strong>{props.name}</strong></Card.Title>
          {props.borrowedDate
            ? (
              <Card.Text className="card-text">
                <strong>Last borrowed on: </strong>
                {props.borrowedDate ? new Date(props.borrowedDate).toLocaleString() : 'Not yet borrowed'}
              </Card.Text>
            )
            : null }
          {descTruncated
            ? (
              <OverlayTrigger
                key='top'
                placement='left'
                overlay={
                  <Tooltip>
                    {props.description}
                  </Tooltip>
                }
              >
                <Card.Text className="card-text">
                  <strong className='tooltip-label'>Description:</strong> {props.description ? descriptionDisplayed : 'No description yet'}
                </Card.Text >
              </OverlayTrigger>
            )
            : (
              <Card.Text className="card-text">
                <strong>Description:</strong> {props.description ? descriptionDisplayed : 'No description yet'}
              </Card.Text >
            )}
          <Card.Text className="card-text">
            <strong>Type:</strong> {props.type}
          </Card.Text>
          <Card.Text className="card-text">
            <strong>Location:</strong> {props.location}
          </Card.Text>
          <Card.Text className="card-text">
            <strong>Status:</strong> {props.status}
          </Card.Text>
          {props.rating === RATINGS.UNRATED
            ? (
              <Card.Text className="card-text">
                <strong>Rating:</strong> {props.rating}
              </Card.Text>
            )
            : null }
          {props.rating !== RATINGS.UNRATED
            ? (
              <div>
                <Card.Text className="card-text">
                  <strong>Rating:</strong> <Rating name="read-only" value={rating} readOnly />
                </Card.Text>
              </div>
            )
            : null }
          {commentsTruncated
            ? (
              <OverlayTrigger
                key='top'
                placement='left'
                overlay={
                  <Tooltip>
                    {props.ratingComments}
                  </Tooltip>
                }
              >
                <Card.Text className="card-text">
                  <strong className='tooltip-label'>Comments:</strong> {props.ratingComments ? ratingCommentsDisplayed : 'No description yet'}
                </Card.Text>
              </OverlayTrigger>
            )
            : (
              <Card.Text className="card-text">
                <strong>Comments:</strong> {props.ratingComments ? ratingCommentsDisplayed : 'No description yet'}
              </Card.Text>
            )}
          {props.featured
            ? (
              <Card.Text className="card-text">
                <strong>Number of Times Borrowed:</strong> {props.numberOfTimesBorrowed}
              </Card.Text>
            )
            : null }
          {props.editRating
            ? (
              <Button variant="outline-primary" size="sm" className="card-buttons" onClick={handleRateItem}>
                Rate Item
              </Button>
            )
            : null }
          <EditRatingModal ratingOpen={editRatingModal} setShowRatingModal={handleCloseRatingModal} id={props.id} rating={props.rating} ratingComments={props.ratingComments} props />
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
