import { React, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { getAllRequestsAsync } from '../../redux/requests/thunks'

import RequestCard from './RequestCard'

import '../../styles.css'

export default function ReceivedRequests () {
  const user = useSelector(state => state.user)
  const requests = useSelector(state => {
    return state.requests.list.filter(request => request.itemOwner._id === user.user)
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllRequestsAsync())
  }, [dispatch])

  return (
    <>
      <div className="single-column-page">
        <h2>My Received Requests</h2>
        <Container fluid className="single-column-page-container">
          {requests.length
            ? requests.map(request => {
              return <RequestCard key={request._id}
                item={request.item.name}
                daysNeededFor={request.daysNeededFor}
                dateNeededOn={request.dateNeededOn}
                reqestorNotes={request.reqestorNotes}
                requestorName={request.requestor.username}
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
