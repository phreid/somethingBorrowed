import '../styles/search.css'
import React, { useState } from 'react'
import { applySearchNameAsync, getAllItemsAsync } from '../redux/items/thunks'
import { useDispatch } from 'react-redux'
import { Button, ButtonToolbar, InputGroup, Form } from 'react-bootstrap'

function FiltersCollection () {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')

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
    </>
  )
}

export default FiltersCollection
