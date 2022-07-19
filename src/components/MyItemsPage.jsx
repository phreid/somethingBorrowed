import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import AddItemForm from './AddItemForm'
import ItemContainer from './ItemContainer'
import NavBar from './NavBar'

import '../styles.css'
import UserHistoryPage from './UserHistoryPage'

function MyItemsPage () {
  return (
    <>
      <NavBar />
      <Tabs fill justify className='mt-3 mb-3' defaultActiveKey='my-items'>
        <Tab eventKey='my-items' title='Manage My Items'>
          <div className="grid-container">
            <div className="grid-child page-container">
              <AddItemForm />
            </div>
            <div className="grid-child page-container">
              <h2>My Items</h2>
              <ItemContainer />
            </div>
          </div>
        </Tab>
        <Tab eventKey='my-history' title='My Borrowed Items'>
          <UserHistoryPage />
        </Tab>
      </Tabs>
    </>
  )
}

export default MyItemsPage
