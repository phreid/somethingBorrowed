import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Tabs, Tab } from 'react-bootstrap'

import { getAllRequestsAsync } from '../../redux/requests/thunks'

import NavBar from '../common/NavBar'
import ReceivedRequests from './ReceivedRequests'
import RequestCard from './RequestCard'

import '../../styles.css'

export default function PendingRequests () {
  const user = useSelector(state => state.user)
  console.log('user: ' + user)

  // TODO: filter with filter(request => request.requestorId === user.user)
  const requests = useSelector(state => {
    return state.items.list
  })

  console.log('pending requests')
  console.log(requests)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllRequestsAsync())
  }, [dispatch])

  return (
    <>
      <NavBar />
      <Tabs fill justify className='mt-3 mb-3' defaultActiveKey='pending'>
        <Tab eventKey='pending' title='Pending Requests'>
          <div className="single-column-page">
            <h2>My Pending Requests</h2>
            <Container fluid className="single-column-page-container">
              {requests.length
                ? requests.map(request => {
                  return <RequestCard key={request.key}
                    itemName={request.itemName}
                    daysNeededFor={request.daysNeededFor}
                    reqestorNotes={request.reqestorNotes}
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
