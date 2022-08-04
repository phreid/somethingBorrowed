import { React, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

import { useDispatch } from 'react-redux'
import { deleteRequestAsync, acceptRequestAsync } from '../../redux/requests/thunks'
import { borrowItemAsync } from '../../redux/items/thunks'

import { REQUEST_STATUS } from '../../constants'

export default function RequestCard (props) {
  const [status, setStatus] = useState(props.status)
  const dispatch = useDispatch()

  function handleCancelRequest () {
    dispatch(deleteRequestAsync(props))
  }

  function handleAcceptRequest () {
    dispatch(acceptRequestAsync(props))
    setStatus(REQUEST_STATUS.ACCEPTED)
  }

  function handleRejectRequest () {
    dispatch(deleteRequestAsync(props))
  }

  function handleConfirmReceived () {
    dispatch(deleteRequestAsync(props))
    dispatch(borrowItemAsync(props.item))
  }

  const cardColour = props.status === REQUEST_STATUS.PENDING ? 'pending-card' : 'accepted-card'

  return (
    <Card className={`request-card" ${cardColour}`} style={{ width: '' }}>
      <div className="header">
        <Card.Title className="request-title"><strong>{props.itemName}</strong></Card.Title>
        {props.requested
          ? (
            <div className="request-card-status">
              {status === REQUEST_STATUS.PENDING
                ? (
                  <Card.Title className="request-card-status">
                    <strong>Pending Response</strong>
                  </Card.Title>
                )
                : null }
              {status === REQUEST_STATUS.ACCEPTED
                ? (
                  <Card.Title className="request-card-status">
                    <strong>Accepted</strong>
                  </Card.Title>
                )
                : null }
            </div>
          )
          : null }
        {props.received
          ? (
            <div className="request-buttons">
              <Button variant="outline-danger" size="sm" className="received-request-btn" onClick={handleRejectRequest}>
                Reject
              </Button>
              <Button variant="outline-primary" size="sm" className="received-request-btn" onClick={handleAcceptRequest}>
                Accept
              </Button>
            </div>
          )
          : null }
      </div>
      {props.received
        ? (
          <div>
            <Card.Text className="card-text">
              <strong>Requestor:</strong> {props.requestorName}
            </Card.Text>
            <Card.Text className="card-text">
              <strong>Requestor email:</strong> {props.requestorEmail}
            </Card.Text>
          </div>
        )
        : null }
      <Card.Text className="card-text">
        <strong>Days requested:</strong> {props.daysNeededFor}
      </Card.Text >
      <Card.Text className="card-text">
        <strong>Date requested:</strong> {props.dateNeededOn}
      </Card.Text >
      <Card.Text className="card-text">
        <strong>Requestor Notes:</strong> {props.reqestorNotes}
      </Card.Text>
      {props.requested
        ? (
          <div>
            {status === REQUEST_STATUS.PENDING
              ? (
                <Button className="pending-request-btn" variant="outline-primary" size="sm" onClick={handleCancelRequest}>
                Cancel request
                </Button>
              )
              : null }
            {status === REQUEST_STATUS.ACCEPTED
              ? (
                <Button className="pending-request-btn" variant="outline-primary" size="sm" onClick={handleCancelRequest}>
                Cancel request
                </Button>
              )
              : null }
            {status === REQUEST_STATUS.ACCEPTED
              ? (
                <Button className="pending-request-btn" variant="outline-primary" size="sm" onClick={handleConfirmReceived}>
                Confirm item received
                </Button>
              )
              : null }
          </div>
        )
        : null }
    </Card>
  )
}
