import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function RequestCard (props) {
  function handleCancelRequest () {
    alert('Request is cancelled')
  }

  function handleAcceptRequest () {
    alert('Request is accepted')
  }

  function handleRejectRequest () {
    alert('Request is rejected')
  }

  return (
    <Card className="request-card" style={{ width: '' }}>
      <div className="header">
        <Card.Title className="request-title"><strong>{props.name}</strong></Card.Title>
        <div className="request-buttons">
          {props.received
            ? (
              <Button variant="outline-danger" size="sm" className="received-request-btn" onClick={handleRejectRequest}>
                Reject
              </Button>
            )
            : null }
          {props.received
            ? (
              <Button variant="outline-primary" size="sm" className="received-request-btn" onClick={handleAcceptRequest}>
                Accept
              </Button>
            )
            : null }
        </div>
      </div>
      {props.received
        ? (
          <Card.Text className="card-text">
            <strong>Requestor:</strong> {props.requestor}
          </Card.Text>
        )
        : null }
      <Card.Text className="card-text">
        <strong>Days requested:</strong> {props.daysRequested}
      </Card.Text >
      <Card.Text className="card-text">
        <strong>Requestor Notes:</strong> {props.requestNotes}
      </Card.Text>
      {props.pending
        ? (
          <Button className="cancel-request-btn" variant="outline-primary" size="sm" onClick={handleCancelRequest}>
                Cancel request
          </Button>
        )
        : null }
    </Card>
  )
}
