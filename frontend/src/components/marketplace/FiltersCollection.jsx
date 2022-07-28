import React, { useState } from 'react'
import { Button, ButtonToolbar, InputGroup, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { ITEM_TYPES, RATINGS } from '../../constants'
import { applySearchNameAsync, getAllItemsAsync, applyFiltersAsync } from '../../redux/items/thunks'

import '../../styles/search.css'

const DEFAULT_TYPE_OPTION = 'All item types'
const DEFAULT_RATING_OPTION = 'All ratings'

function FiltersCollection () {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')
  const [itemType, setItemType] = useState('')
  const [itemRating, setItemRating] = useState('')

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
    let theRating = itemRating
    let theType = itemType
    if (itemRating === '') {
      theRating = undefined
    }
    if (itemType === '') {
      theType = undefined
    }
    const jsonObj = JSON.stringify({ rating: theRating, type: theType })
    dispatch(applyFiltersAsync(jsonObj))
  }

  const handleClearFilters = () => {
    setItemType('')
    setItemRating('')
    dispatch(getAllItemsAsync())
  }

  const itemTypeDropdowns = Object.values(ITEM_TYPES).map((type) => {
    return <option key={type}>{type}</option>
  })

  const ratingDropdowns = Object.values(RATINGS).map((rate) => {
    return <option key={rate}>{rate}</option>
  })

  const handleClearSearch = () => {
    dispatch(getAllItemsAsync())
  }

  const handleApplySearch = () => {
    if (searchInput === '') {
      dispatch(getAllItemsAsync())
    } else {
      dispatch(applySearchNameAsync(searchInput))
    }
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
      <br></br>
      <div className = "searchBar">
        <Button variant="outline-primary" type="submit" className="me-1 button apply-filter" onClick={handleApplyFilter}>Apply Filters</Button>
        <Button variant="outline-secondary" className="me-1 button clear-filter" onClick={handleClearFilters}>Clear Filters</Button>
      </div>
    </>
  )
}

export default FiltersCollection
