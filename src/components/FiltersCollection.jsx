import '../styles/search.css'
import React, { useState } from 'react'
import { applySearchNameAsync, getAllItemsAsync, applyFiltersAsync } from '../redux/items/thunks'
import { useDispatch } from 'react-redux'
import { Button, ButtonToolbar, InputGroup, Form } from 'react-bootstrap'
import { ITEM_TYPES, RATINGS } from '../constants'

function FiltersCollection () {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')
  const [itemType, setItemType] = useState('Select item type...')
  const [itemRate, setItemRate] = useState('Unrated')

  function handleCategory (event) {
    setItemType(event.target.value)
  }

  function handleRating (event) {
    setItemRate(event.target.value)
  }

  function handleApplyFilter () {
    const jsonObj = JSON.stringify({ rating: itemRate, type: itemType })
    console.log(jsonObj + '  line32')
    dispatch(applyFiltersAsync(jsonObj))
  }

  const handleClearFilters = () => {
    setItemType('Select item type...')
    setItemRate('Unrated')
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
          <option>Select item type...</option>
          {itemTypeDropdowns}
        </Form.Select>
      </Form.Group>
      <Form.Group >
        <Form.Select value={itemRate} onChange={handleRating}>
          {ratingDropdowns}
        </Form.Select>
      </Form.Group>
      <br></br>
      <a className="search_input">
        <Button variant="outline-primary" type="submit" className="me-1 button apply-filter" onClick={handleApplyFilter}>Apply Filters</Button>
        <Button variant="outline-secondary" className="me-1 button clear-filter" onClick={handleClearFilters}>Clear Filters</Button>
      </a>
    </>
  )
}

export default FiltersCollection
