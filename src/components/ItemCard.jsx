import React from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../redux/items/items'
import placeholder from '../images/placeholder.jpg'

function ItemCard (props) {
  const dispatch = useDispatch()

  return (
    <Card className="item-card" style={{ width: '' }}>
      <Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
        <div className="col-md-4">
          <Card.Img className="item-img" src={props.image || placeholder } />
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
        </div>
      </Row>
    </Card>
  )
}

export default ItemCard
