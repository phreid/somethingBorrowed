import '../styles/search.css'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { applyFiltersAsync } from '../redux/items/thunks'

function Search () {
  const currUser = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')
  const [isCheckedList, setIsCheckedList] = useState([])

  const inputHandler = (e) => {
    const lowerCase = e.target.value

    if (e.keyCode === 13) {
      setSearchInput(lowerCase)
      const c0 = document.getElementById('Kitchen').checked
      const c1 = document.getElementById('Outdoor').checked
      const c2 = document.getElementById('Tools').checked
      const c3 = document.getElementById('DIY').checked
      setIsCheckedList([c0, c1, c2, c3])

      dispatch(applyFiltersAsync(JSON.stringify({ searchText: searchInput, cList: isCheckedList, currUser })))
    }
  }

  return (
    <>
      <div className="search">
        <div className="searchBar">
          <input
            id="outlined-basic"
            label="Search"
            placeholder="Press Enter to Search"
            onKeyDown={inputHandler}
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

export default Search
