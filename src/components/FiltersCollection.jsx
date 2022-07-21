import '../styles/search.css'
import React, { useState } from 'react'
import { applySearchNameAsync, getAllItemsAsync } from '../redux/items/thunks'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

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
      <div className="search">
        <div className="searchBar">
          <div className="mb-2">
            <input
              id = "search_input"
              type="text"
              placeholder='Press Enter To Search'
              value = {searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              title="Cancel"
            />
            <Button className='clear' size="sm" variant="outline-primary" type="submit" onClick={handleClearInput}>X</Button>
            {' '}
            <Button size="sm" variant="outline-primary" type="submit" className="me-1 button apply-search" onClick={handleApplySearch}>Apply Search</Button>
            {' '}
            <Button size="sm" variant="outline-primary" type="submit" className="me-1 button clear-search" onClick={handleClearSearch}>Clear Search</Button></div>

        </div>
      </div>
    </>
  )
}

export default FiltersCollection
