import React from 'react'

import AddItemForm from './AddItemForm'
import ItemContainer from './ItemContainer'
import NavBar from './NavBar'

import '../styles.css'

function MyItemsPage () {
  return (
    <>
      <NavBar />
      <div className="grid-container">
        <div className="grid-child page-container">
          <AddItemForm />
        </div>
        <div className="grid-child page-container" id="container-border">
          <h2>My Items</h2>
          <ItemContainer />
        </div>
      </div>
    </>
  )
}

export default MyItemsPage