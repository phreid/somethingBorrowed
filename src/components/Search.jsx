import '../styles/search.css'
import React, { useState } from 'react'
import { ITEM_TYPES } from '../constants'
import { getAllItemsAsync, getItemByTypeAsync } from '../redux/items/thunks'
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'

function Search () {
  const [itemType, setItemType] = useState('')

  const itemTypeDropdowns = Object.values(ITEM_TYPES).map((type) => {
    return <option key={type}>{type}</option>
  })

  const dispatch = useDispatch()

  function handleCategory (event) {
    if (event.target.value === 'Select item type...') {
      alert('Please select a type from the filter list')
      setItemType('')
      dispatch(getAllItemsAsync())
      return
    }
    setItemType(event.target.value)
    dispatch(getItemByTypeAsync(event.target.value))
  }

  const handleClearFilters = () => {
    setItemType('')
    dispatch(getAllItemsAsync())
  }

  return (
    <>
      <div className="search">
        <div className="filters">
          <Form.Group >
            <Form.Select value={itemType} onChange={handleCategory}>
              <option>Select item type...</option>
              {itemTypeDropdowns}
            </Form.Select>
          </Form.Group>
          <Button variant="outline-primary" type="submit" className="me-1 button reset-filter" onClick={handleClearFilters}>Clear Filters</Button>
        </div>

      </div>
    </>
  )
}

export default Search
