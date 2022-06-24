import '../styles.css'
import TextField from "@mui/material/TextField";
import React,{useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link} from 'react-router-dom'
import {IconContext} from 'react-icons';
import SearchResultContainer from './SearchResultContainer';

function SearchSideBar () {
	const [searchInput, setSearchInput] = useState("");
	let inputHandler = (e) => {
		//convert input text to lower case
		var lowerCase = e.target.value.toLowerCase();
		if(event.key === 'Enter') {
			// alert(e.target.value.toLowerCase());
			setSearchInput(lowerCase);        
		}
		// setSearchInput(lowerCase);  
	};
	const [v, setV] = useState(false);
	const showSearchBar=()=>setV(!v);
	const { v4: uuidv4 } = require('uuid');
	return (
	  <>
	  
		<div className='sideBarIcon'>
			<Link to='#' className='menu-bars'>
				<FaIcons.FaBars onClick={showSearchBar}/>
			</Link>
		</div>
		<nav className={v ? 'nav-menu active':'nav-menu'}>
			<div className='sidebar-menu'>
				<div className='sidebar'>
					<div className='links'>
						<div className='link'>
							<div className="search">
								<input
								id="outlined-basic"
								fullWidth
								label="Search"
								placeholder="Press Enter to Search"
								onKeyDown={inputHandler}
								/>
							</div>
						</div>
						<div className='link'>
							<a href='#'>Category</a>
							<div className='sub-menu'>
								<a href='#'><label for="Kitchen"> Kitchen </label><input type="checkbox" id="Kitchen"/></a>
								<a href='#'><label for="Outdoor"> Outdoor </label><input type="checkbox" id="Outdoor"/></a>
								<a href='#'><label for="Tools"> Tools </label><input type="checkbox" id="Tools"/></a>
								<a href='#'><label for="DIY"> DIY </label><input type="checkbox" id="DIY"/></a>
							</div>
						</div>
						<div className='link'>
							<a href='#'>
								<i >Rate</i>
							</a>
							<div className='sub-menu'>
							<input type="range" min="1" max="10" class="slider" id="slider"/>
							</div>
						</div>
						<div className='link'>
							<a href='#'>
								<i >Location</i>
							</a>
							<div className='sub-menu'>
							<a href='#'><label for="UBC"> UBC </label><input type="checkbox" id="UBC" disabled={true}/></a>
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

  /**
   * <ul className='nav-menu-items'>
				<li key={uuidv4()}>
					<input className='nav-text'></input>
                </li>
				<li key={uuidv4()}>
					<span className='nav-text'>Category</span>
                </li>
				<li key={uuidv4()}>
					<span className='nav-text'>Rate</span>
                </li>
				<li key={uuidv4()}>
					<span className='nav-text'>Location</span>
                </li>
			</ul>
   * 
   * 
   * 
   * 
   * 
   * <ProSidebar className='SearchSideBarMarketPlace'>
		<SidebarHeader>
			{
				<><TextField
				id="SearchBar"
				variant="outlined"
				fullWidth
				label="Search"/><br></br>
				<button>Search</button>
				</>
			}
		</SidebarHeader>
			<Menu >
				<SubMenu title="Category" >
					<MenuItem><label for="Kitcken">Kitcken</label> 
						<input type="checkbox" id="Kitcken"/></MenuItem>
					<MenuItem><label for="Outdoor">Outdoor </label> 
						<input type="checkbox" id="Outdoor" /></MenuItem>
					<MenuItem><label for="Garage">Garage </label> 
						<input type="checkbox" id="Garage" /></MenuItem>
					<MenuItem><label for="Others">Others </label> 
						<input type="checkbox" id="Others" /></MenuItem>
				</SubMenu>
				<SubMenu title="Location" >
					<MenuItem><label for="UBC">UBC </label> 
						<input type="checkbox" id="UBC" disabled={true}/></MenuItem>
				</SubMenu>
				<SubMenu title="Rating" >
					<MenuItem>
					<div data-role="rangeslider">
						<input type="range" name="range-1a" id="range-1a" min="0" max="10" />
					</div>
					</MenuItem>
				</SubMenu>
			</Menu>
		</ProSidebar>
   * 
   */