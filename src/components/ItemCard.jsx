import React, { useState } from 'react'
import { Button, Card, Row } from 'react-bootstrap'

function ItemCard (props) {
  const [borrowed, setBorrowed] = useState(false)
  const [buttonText, setButtonText] = useState('Borrow Item')

  function handleBorrowItem () {
    if (borrowed === true) {
      return
    }

    setBorrowed(true)
    setButtonText('Borrowed')
  }

  return (
    <Card className="item-card" style={{ width: '' }}>
      <Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
        <div className="col-md-4">
          <Card.Img className="item-image" src={props.image} />
        </div>
        <div className="col-md-8">
          <Card.Title className="item-name">{props.name}</Card.Title>
          <Card.Text className="item-description">
            <strong>Description:</strong> {props.description}
          </Card.Text >
          <Card.Text className="item-type">
            <strong>Type:</strong> {props.type}
          </Card.Text>
          <Card.Text className="item-location">
            <strong>Location:</strong> {props.location}
          </Card.Text>
          {props.borrow ? <Button onClick={handleBorrowItem}>{buttonText}</Button> : null }
        </div>
      </Row>
    </Card>
  )
}

export default ItemCard
