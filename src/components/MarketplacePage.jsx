import {React, useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { noFilterAsync, getAllItemsAsync } from '../redux/items/thunks'
import { miList } from '../redux/items/marketsplaceItems'
import ItemCard from './ItemCard'
import NavBar from './NavBar'
import Search from './Search'

import '../styles/marketplace.css'

function MarketplacePage () {
	// working: state => state.m.list
	// const itemstest = useSelector(state => state.itemsSliceTest.items)
	const items = useSelector(state => state.m.list)
	const currUser = useSelector(state => state.user.user)
	const dispatch = useDispatch()
	useEffect(() => {
		//console.log(items);
		//console.log(currUser);
	  dispatch(noFilterAsync(currUser))
	  // console.log("1"+items);
	}, [dispatch])
	//const t0 = useSelector(state => state.items.list)
	//const t1 = useSelector(state => state.m.list)
	//const t2 = useSelector(state => state.m.itemCards)
	//const t3 = useSelector(state => state.m.initialState)
	// const t4 = useSelector(state => state.m.list)
	// console.log(t0)
	// console.log(items)
	//console.log("2 "+t2)
	//console.log("3 "+t3)
	//console.log("4 "+t4)
	
	return (
		<>
		<NavBar />
		<h1 className="page-title">Marketplace</h1>
		<div className="grid-container">
			<div className="grid-child page-container">
			<Search/>
			</div>
			<div className="grid-child page-container" id="container-border">
				{items.map(item => {
				return <ItemCard key={item.id}
					id={item.id}
					image={item.image}
					name={item.name}
					description={item.description}
					type={item.type}
					location={item.location}
					status={item.status}
					borrow
				/>
				})}
			</div>
		</div>
		</>
	)
}

export default MarketplacePage

