import { React } from 'react'
import { Container } from 'react-bootstrap'

import RequestCard from './RequestCard'

import '../../styles.css'

export default function ReceivedRequests () {
  const requests = [{ key: 1, name: 'Garden spade', daysRequested: '7', requestNotes: 'Just need it to plant my garden beds', requestor: 'Tom' },
    { key: 2, name: 'Ladder', daysRequested: '3', requestNotes: 'Can pick up and return as I have a truck', requestor: 'Jane' },
    { key: 3, name: 'Ladder', daysRequested: '4', requestNotes: 'Available to meet after 5pm weekdays', requestor: 'Alex' }]

  return (
    <>
      <div className="single-column-page">
        <h2>My Received Requests</h2>
        <Container fluid className="single-column-page-container">
          {requests.length
            ? requests.map(item => {
              return <RequestCard key={item.key}
                name={item.name}
                daysRequested={item.daysRequested}
                requestNotes={item.requestNotes}
                requestor={item.requestor}
                received
              />
            })
            : <p className="text-center">You have no received requests.</p>
          }
        </Container>
      </div>
    </>
  )
}
