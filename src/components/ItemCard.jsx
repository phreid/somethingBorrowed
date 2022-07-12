import React, { useState } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import EditCardModal from './EditCardModal'
import diy from '../images/defaultImages/diy.jpg'
import kitchen from '../images/defaultImages/kitchen.jpg'
import outdoors from '../images/defaultImages/outdoors.jpg'
import tools from '../images/defaultImages/tools.jpg'
import { borrowItemAsync, deleteItemAsync } from '../redux/items/thunks'
import { ITEM_TYPES, STATUS } from '../constants'

function ItemCard (props) {
  const borrowed = useSelector(state => {
    return state.items.list.find((item) => item._id === props.id).status === STATUS.BORROWED
  })
  const [buttonText, setButtonText] = useState(borrowed ? 'Borrowed' : 'Borrow Item')
  const [editOpen, setEditOpen] = useState(props.modalOpen)

  const dispatch = useDispatch()

  function handleBorrowItem () {
    if (borrowed === true) {
      return
    }

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
          {props.edit ? <Button variant="outline-primary" size="sm" className="card-buttons" onClick={handleEditItem}>Edit Item</Button> : null }
          {props.delete ? <Button variant="outline-danger" size="sm" className="card-buttons" onClick={handleDeleteItem}>Delete</Button> : null }
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
          {props.borrow ? <Button disabled={borrowed} variant="outline-primary" size="sm" onClick={handleBorrowItem}>{buttonText}</Button> : null }
        </div>
      </Row>
    </Card>
  )
}

export default ItemCard
