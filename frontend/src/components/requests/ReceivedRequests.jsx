import { React, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { getAllRequestsAsync } from '../../redux/requests/thunks'

import RequestCard from './RequestCard'

import '../../styles.css'

export default function ReceivedRequests () {
  const user = useSelector(state => state.user)
  console.log('user: ' + user)

  // TODO: filter with .filter(request => request.itemOwner === user.user)
  const requests = useSelector(state => {
    return state.items.list
  })

  console.log('received requests')
  console.log(requests)

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
              return <RequestCard key={request.key}
                itemName={request.itemName}
                daysNeededFor={request.daysNeededFor}
                reqestorNotes={request.reqestorNotes}
                requestorName={request.requestorName}
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
