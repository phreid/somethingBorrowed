import React, { useState } from 'react'
import { Button, ButtonToolbar, InputGroup, Form, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { ITEM_TYPES, RATINGS, STATUS, LOCATIONS } from '../../constants'
import { getItemsAsync } from '../../redux/items/thunks'

import '../../styles/search.css'

const DEFAULT_TYPE_OPTION = 'All item types'
const DEFAULT_RATING_OPTION = 'All ratings'
const DEFAULT_STATUS_OPTION = 'All status'
const DEFAULT_LOCATION_OPTION = 'All locations'

function FiltersCollection () {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')
  const [itemType, setItemType] = useState('')
  const [itemRating, setItemRating] = useState('')
  const [itemStatus, setItemStatus] = useState('')
  const [itemLocation, setItemLocation] = useState('')

  function handleStatus (event) {
    if (event.target.value === DEFAULT_STATUS_OPTION) {
      setItemStatus('')
    } else {
      setItemStatus(event.target.value)
    }
  }

  function handleCategory (event) {
    if (event.target.value === DEFAULT_TYPE_OPTION) {
      setItemType('')
    } else {
      setItemType(event.target.value)
    }
  }

  function handleRating (event) {
    if (event.target.value === DEFAULT_RATING_OPTION) {
      setItemRating('')
    } else {
      setItemRating(event.target.value)
    }
  }

  function handleLocation (event) {
    if (event.target.value === DEFAULT_LOCATION_OPTION) {
      setItemLocation('')
    } else {
      setItemLocation(event.target.value)
    }
  }

  const handleClearInput = () => {
    setSearchInput('')
  }

  const itemTypeDropdowns = Object.values(ITEM_TYPES).map((type) => {
    return <option key={type}>{type}</option>
  })

  const ratingDropdowns = Object.values(RATINGS).map((rate) => {
    return <option key={rate}>{rate}</option>
  })

  const statusDropdowns = Object.values(STATUS).map((status) => {
    return <option key={status}>{status}</option>
  })

  const locationDropdowns = Object.values(LOCATIONS).map((location) => {
    return <option key={location}>{location}</option>
  })

  const handleResetAll = () => {
    setSearchInput('')
    setItemType('')
    setItemRating('')
    setItemStatus('')
    setItemLocation('')
    dispatch(getItemsAsync())
  }

  const handleApplyAll = () => {
    const search = searchInput || undefined
    const rating = itemRating || undefined
    const type = itemType || undefined
    const status = itemStatus || undefined
    const location = itemLocation || undefined
    dispatch(getItemsAsync({ search, rating, type, status, location }))
  }

  return (
    <>
      <Table responsive>
        <tbody>
          <tr>
            <td>
              <ButtonToolbar className="d-flex justify-content-center">
                <InputGroup className="me-3">
                  <Form.Control
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter your search"
                  />
                  <Button className='clear-filter-btn' variant="outline-secondary" onClick={handleClearInput}>Clear</Button>
                </InputGroup>
              </ButtonToolbar>
            </td>
            <td>
              <Form.Group >
                <Form.Select value={itemType} onChange={handleCategory}>
                  <option>{DEFAULT_TYPE_OPTION}</option>
                  {itemTypeDropdowns}
                </Form.Select>
              </Form.Group>
            </td>
            <td>
              <Form.Group >
                <Form.Select value={itemRating} onChange={handleRating}>
                  <option>{DEFAULT_RATING_OPTION}</option>
                  {ratingDropdowns}
                </Form.Select>
              </Form.Group>
            </td>
            <td>
              <Form.Group >
                <Form.Select value={itemStatus} onChange={handleStatus}>
                  <option>{DEFAULT_STATUS_OPTION}</option>
                  {statusDropdowns}
                </Form.Select>
              </Form.Group>
            </td>
            <td>
              <Form.Group >
                <Form.Select value={itemLocation} onChange={handleLocation}>
                  <option>{DEFAULT_LOCATION_OPTION}</option>
                  {locationDropdowns}
                </Form.Select>
              </Form.Group>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className='filter-btn-div'>
        <Button className='filter-btn' onClick={handleApplyAll}>Apply All</Button>{' '}
        <Button className='filter-btn' onClick={handleResetAll}>Reset All</Button>
      </div>
    </>
  )
}

export default FiltersCollection
