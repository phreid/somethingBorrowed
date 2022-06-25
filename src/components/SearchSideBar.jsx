import '../styles.css'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import SearchResultContainer from './SearchResultContainer'

function SearchSideBar () {
  const [searchInput, setSearchInput] = useState('')
  const inputHandler = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase()
    if (event.key === 'Enter') {
      // alert(e.target.value.toLowerCase());
      setSearchInput(lowerCase)
    }
    // setSearchInput(lowerCase);
  }
  const [v, setV] = useState(false)
  const showSearchBar = () => setV(!v)
  const { v4: uuidv4 } = require('uuid')
  return (
	  <>

      <div className='sideBarIcon'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSearchBar}/>
        </Link>
      </div>
      <nav className={v ? 'nav-menu active' : 'nav-menu'}>
        <div className='sidebar-menu'>
          <div className='sidebar'>
            <div className='links'>
              <div className='link'>
                <div className="search">
                  <input
                    id="outlined-basic"
                    label="Search"
                    placeholder="Press Enter to Search"
                    onKeyDown={inputHandler}
                  />
                </div>
              </div>
              <div className='link'>
                <a href='#'>Category</a>
                <div className='sub-menu'>
                  <a href='#'><label htmlFor="Kitchen"> Kitchen </label><input type="checkbox" id="Kitchen"/></a>
                  <a href='#'><label htmlFor="Outdoor"> Outdoor </label><input type="checkbox" id="Outdoor"/></a>
                  <a href='#'><label htmlFor="Tools"> Tools </label><input type="checkbox" id="Tools"/></a>
                  <a href='#'><label htmlFor="DIY"> DIY </label><input type="checkbox" id="DIY"/></a>
                </div>
              </div>
              <div className='link'>
                <a href='#'>
                  <i >Rate</i>
                </a>
                <div className='sub-menu'>
                  <input type="range" min="1" max="10" className="slider" id="slider"/>
                </div>
              </div>
              <div className='link'>
                <a href='#'>
                  <i >Location</i>
                </a>
                <div className='sub-menu'>
                  <a href='#'><label htmlFor="UBC"> UBC </label><input type="checkbox" id="UBC" disabled={true}/></a>
                </div>
              </div>
              <div className='link'>
                <a href='#'>
                  <SearchResultContainer searchText={searchInput}/>

                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

	  </>
  )
}

export default SearchSideBar