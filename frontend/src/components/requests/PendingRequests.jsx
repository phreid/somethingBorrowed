import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Tabs, Tab } from 'react-bootstrap'

import { getAllRequestsAsync } from '../../redux/requests/thunks'

import NavBar from '../common/NavBar'
import ReceivedRequests from './ReceivedRequests'
import RequestCard from './RequestCard'

import { REQUEST_STATUS } from '../../constants'

import '../../styles.css'

export default function PendingRequests () {
  const user = useSelector(state => state.user)
  const requests = useSelector(state => {
    return state.requests.list.filter(request => request.requestor._id === user.user && request.status !== REQUEST_STATUS.DECLINED)
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllRequestsAsync())
  }, [dispatch])

  return (
    <>
      <NavBar />
      <Tabs fill justify className='mt-3 mb-3' defaultActiveKey='pending'>
        <Tab className='tab-content' eventKey='pending' title='Items Requested'>
          <div className="single-column-page">
            <br/>
            <Container fluid className="single-column-page-container">
              {requests.length
                ? requests.map(request => {
                  return <RequestCard key={request._id}
                    id={request._id}
                    item={request.item}
                    itemName={request.item.name}
                    daysNeededFor={request.daysNeededFor}
                    dateNeededOn={request.dateNeededOn}
                    reqestorNotes={request.reqestorNotes}
                    status={request.status}
                    requested
                  />
                })
                : <p className="info-text-center">You have no pending requests.</p>
              }
            </Container>
          </div>
        </Tab>
        <Tab className='tab-content' eventKey='received' title='Received Requests'>
          <ReceivedRequests />
        </Tab>
      </Tabs>
    </>
  )
}
