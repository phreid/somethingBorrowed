import '../styles/search.css'
import React, { useState } from 'react'
import { applySearchNameAsync, getAllItemsAsync } from '../redux/items/thunks'
import { useDispatch } from 'react-redux'

function FiltersCollection () {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')
  const [isCheckedList, setIsCheckedList] = useState([])

  const inputHandler = (e) => {
    const input = e.target.value

    const keyCode = e.keyCode || e.which
    if (input === null || input === '') {
      dispatch(getAllItemsAsync())
    } else if (keyCode === 13) {
      setSearchInput('')
	  // dispatch(getAllItemsAsync())
	  dispatch(applySearchNameAsync(input))
	  // placeholder='Press Enter To Search'
    }
  }

  return (
    <>
      <div className="search">
        <div className="searchBar">
          <input
            type="text"
            placeholder='Press Enter To Search'
            onKeyDown={inputHandler}
            value = {searchInput}
            onChange={(e) => setSearchInput(e.target.value)}

          />

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
