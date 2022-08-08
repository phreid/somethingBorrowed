import { React, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { REQUEST_STATUS } from '../../constants'

import { getAllRequestsAsync } from '../../redux/requests/thunks'

import RequestCard from './RequestCard'

import '../../styles.css'

export default function ReceivedRequests () {
  const user = useSelector(state => state.user)
  const requests = useSelector(state => {
    return state.requests.list.filter(request => request.itemOwner._id === user.user && request.status === REQUEST_STATUS.PENDING)
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllRequestsAsync())
  }, [dispatch])

  return (
    <>
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
                requestorName={request.requestor.username}
                requestorEmail={request.requestor.email}
                status={request.status}
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
