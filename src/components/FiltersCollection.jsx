import '../styles/search.css'
import React, { useState } from 'react'
import { applySearchNameAsync, getAllItemsAsync } from '../redux/items/thunks'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

function FiltersCollection () {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')

  const handleClearSearch = () => {
    setSearchInput('')
  }

  const handleApplySearch = () => {
	if (searchInput === '') {
		dispatch(getAllItemsAsync())
	} else {
		dispatch(applySearchNameAsync(searchInput))
	}
	setSearchInput('')
  }

  return (
    <>
      <div className="search">
        <div className="searchBar">
		  <div className="mb-2">
			<input
				id = "searchInput"
				type="text"
				placeholder='Press Enter To Search'
				value = {searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
			/>
			{' '}
			<Button size="sm" variant="outline-primary" type="submit" className="me-1 button apply-search" onClick={handleApplySearch}>Apply Search</Button>
		  	{' '}
		  	<Button  size="sm" variant="outline-primary" type="submit" className="me-1 button clear-search" onClick={handleClearSearch}>Clear Search</Button>
		  </div>
		  
        </div>
        <div className="filters">
          <div className='filter'>
            <b className='filterText'>Category</b>
            <div className='categories'>
              <a ><label htmlFor="Kitchen" className='label'>Kitchen</label><input type="checkbox" id="Kitchen" className='checkbox'/></a>
              <a ><label htmlFor="Outdoor" className='label'>Outdoor</label><input type="checkbox" id="Outdoor" className='checkbox'/></a>
              <a ><label htmlFor="Tools" className='label'>Tools</label><input type="checkbox" id="Tools" className='checkbox'/></a>
              <a ><label htmlFor="DIY" className='label'>DIY</label><input type="checkbox" id="DIY" className='checkbox'/></a>
            </div>
          </div>
          <div className='filter'>
            <b className='filterText'>Location</b>
            <div className='location'>
              <a ><label htmlFor="UBC"> UBC </label><input type="checkbox" id="UBC" disabled={true}/></a>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default FiltersCollection
