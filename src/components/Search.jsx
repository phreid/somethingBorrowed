import '../styles/search.css'
import React, { useState, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { useSelector, useDispatch } from 'react-redux'
import { applyFiltersAsync, noFilterAsync, getAllItemsAsync } from '../redux/items/thunks'

function Search () {
	const items = useSelector(state => state.m.list)
	const currUser = useSelector(state => state.user.user)
	const dispatch = useDispatch()
	const [searchInput, setSearchInput] = useState('')
	const [isCheckedList, setIsCheckedList] = useState([])
	
	const inputHandler = (e) => {
		// convert input text to lower case
		const lowerCase = e.target.value
		
		if (e.keyCode === 13) {
			//console.log(lowerCase === "")
			setSearchInput(lowerCase)
			let c0 = document.getElementById('Kitchen').checked;
			let c1 = document.getElementById('Outdoor').checked;
			let c2 = document.getElementById('Tools').checked;
			let c3 = document.getElementById('DIY').checked;
			setIsCheckedList([c0,c1,c2,c3])
			//dispatch(applyFiltersAsync(JSON.stringify({searchText: searchInput, cList: isCheckedList})))
			dispatch(applyFiltersAsync(JSON.stringify({searchText: searchInput, cList: isCheckedList, currUser: currUser})))
			// console.log("3"+JSON.stringify(items));
			// setSearchInput('')
			// setIsCheckedList([])
		}
  	}

  return (
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
            <a ><label htmlFor="Kitchen" className='label'>Kitchen		</label><input type="checkbox" id="Kitchen" className='checkbox'/></a>
            <a ><label htmlFor="Outdoor" className='label'>Outdoor	</label><input type="checkbox" id="Outdoor" className='checkbox'/></a>
            <a ><label htmlFor="Tools" className='label'>Tools	</label><input type="checkbox" id="Tools" className='checkbox'/></a>
            <a ><label htmlFor="DIY" className='label'>DIY	</label><input type="checkbox" id="DIY" className='checkbox'/></a>
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
  )
}

export default Search
