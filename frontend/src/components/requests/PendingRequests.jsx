import React from 'react'
import { Container, Tabs, Tab } from 'react-bootstrap'

import NavBar from '../common/NavBar'
import ReceivedRequests from './ReceivedRequests'
import RequestCard from './RequestCard'

import '../../styles.css'

export default function PendingRequests () {
  const requests = [{ key: 1, name: 'Overcooked Video Game', daysRequested: '14', requestNotes: 'I like this game a lot', owner: 'Anusha' }]

  return (
    <>
      <NavBar />
      <Tabs fill justify className='mt-3 mb-3' defaultActiveKey='pending'>
        <Tab eventKey='pending' title='Pending Requests'>
          <div className="single-column-page">
            <h2>My Pending Requests</h2>
            <Container fluid className="single-column-page-container">
              {requests.length
                ? requests.map(item => {
                  return <RequestCard key={item.key}
                    name={item.name}
                    daysRequested={item.daysRequested}
                    requestNotes={item.requestNotes}
                    pending
                  />
                })
                : <p className="text-center">You have no pending requests.</p>
              }
            </Container>

          </div>
        </Tab>
        <Tab eventKey='received' title='Received Requests'>
          <ReceivedRequests />
        </Tab>
      </Tabs>
    </>
  )
}
