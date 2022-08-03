import React, { useState } from 'react'
import { Button, ButtonToolbar, InputGroup, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { ITEM_TYPES, RATINGS, STATUS } from '../../constants'
import { getItemsAsync } from '../../redux/items/thunks'

import '../../styles/search.css'

const DEFAULT_TYPE_OPTION = 'All item types'
const DEFAULT_RATING_OPTION = 'All ratings'
const DEFAULT_STATUS_OPTION = 'All status'

function FiltersCollection () {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')
  const [itemType, setItemType] = useState('')
  const [itemRating, setItemRating] = useState('')
  const [itemStatus, setItemStatus] = useState('')

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

  function handleApplyFilter () {
    const rating = itemRating || undefined
    const type = itemType || undefined
    const status = itemStatus || undefined
    dispatch(getItemsAsync({ rating, type, status }))
  }

  const handleClearFilters = () => {
    setItemType('')
    setItemRating('')
    setItemStatus('')
    dispatch(getItemsAsync())
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

  const handleClearSearch = () => {
    setSearchInput('')
    dispatch(getItemsAsync())
  }

  const handleApplySearch = () => {
    dispatch(getItemsAsync({ search: searchInput }))
  }

  const handleClearInput = () => {
    setSearchInput('')
  }

  return (
    <>
      <ButtonToolbar className="d-flex justify-content-center">
        <InputGroup className="me-3">
          <Form.Control
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter your search"
          />
          <Button variant="outline-secondary" onClick={handleClearInput}>Clear</Button>
        </InputGroup>
        <Button className="me-1" variant="outline-primary" onClick={handleApplySearch}>Search</Button>
        <Button variant="outline-secondary" onClick={handleClearSearch}>Reset Search</Button>
      </ButtonToolbar>
      <br></br>
      <Form.Group >
        <Form.Select value={itemType} onChange={handleCategory}>
          <option>{DEFAULT_TYPE_OPTION}</option>
          {itemTypeDropdowns}
        </Form.Select>
      </Form.Group>
      <Form.Group >
        <Form.Select value={itemRating} onChange={handleRating}>
          <option>{DEFAULT_RATING_OPTION}</option>
          {ratingDropdowns}
        </Form.Select>
      </Form.Group>
      <Form.Group >
        <Form.Select value={itemStatus} onChange={handleStatus}>
          <option>{DEFAULT_STATUS_OPTION}</option>
          {statusDropdowns}
        </Form.Select>
      </Form.Group>
      <br></br>
      <div className = "searchBar">
        <Button variant="outline-primary" type="submit" className="me-1 button apply-filter" onClick={handleApplyFilter}>Apply Filters</Button>
        <Button variant="outline-secondary" className="me-1 button clear-filter" onClick={handleClearFilters}>Clear Filters</Button>
      </div>
    </>
  )
}

export default FiltersCollection
