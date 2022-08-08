import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import NavBar from '../common/NavBar'
import AddItemForm from './AddItemForm'
import ItemContainer from './ItemContainer'
import UserHistoryPage from './UserHistoryPage'

import '../../styles.css'

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
        <Tab eventKey='my-history' title='Borrowing History'>
          <UserHistoryPage />
        </Tab>
      </Tabs>
    </>
  )
}

export default MyItemsPage
