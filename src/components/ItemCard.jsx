import React, { useState } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteItem, updateStatus } from '../redux/items/items'
import diy from '../images/defaultImages/diy.jpg'
import kitchen from '../images/defaultImages/kitchen.jpg'
import outdoors from '../images/defaultImages/outdoors.jpg'
import tools from '../images/defaultImages/tools.jpg'

function ItemCard (props) {
  const [borrowed, setBorrowed] = useState(false)
  const [buttonText, setButtonText] = useState('Borrow Item')
  const dispatch = useDispatch()

  function handleBorrowItem () {
    if (borrowed === true) {
      return
    }

    setBorrowed(true)
    setButtonText('Borrowed')
    dispatch(updateStatus(props))
  }

  return (
    <Card className="item-card" style={{ width: '' }}>
      <Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
        <div className="col-md-4">
          <Card.Img className="item-img" src={
            props.image ||
              ((props.type === 'DIY') && diy) ||
              ((props.type === 'Kitchen') && kitchen) ||
              ((props.type === 'Outdoors') && outdoors) ||
              ((props.type === 'Tools') && tools)
          } />
        </div>
        <div className="col-md-8">

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
