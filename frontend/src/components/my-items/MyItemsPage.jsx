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
        <Tab className='tab-content' eventKey='my-items' title='Manage My Items'>
          <div className="grid-container">
            <div className="grid-child item-form-container">
              <AddItemForm />
            </div>
            <div className="grid-child page-container">
              <h2 className='add-item-heading'>My Items</h2>
              <ItemContainer />
            </div>
          </div>
        </Tab>
        <Tab className='tab-content' eventKey='my-history' title='Borrowing History'>
          <UserHistoryPage />
        </Tab>
      </Tabs>
    </>
  )
}

export default MyItemsPage
