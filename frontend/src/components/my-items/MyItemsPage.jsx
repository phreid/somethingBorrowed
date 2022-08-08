import React from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'

import NavBar from '../common/NavBar'
import AddItemForm from './AddItemForm'
import ItemContainer from './ItemContainer'
import UserHistoryPage from './UserHistoryPage'

import '../../styles.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function MyItemsPage () {
  return (
    <>
      <NavBar />
      <Tabs fill justify className='mt-3 mb-3' defaultActiveKey='my-items'>
        <Tab className='tab-content' eventKey='my-items' title='Manage My Items'>
          <Container fluid className="container">
            <Row>
              <Col xs={12} sm={12} lg={6}>
                <div className="item-form-container">
                  <AddItemForm />
                </div>
              </Col>
              <Col xs={12} sm={12} lg={6}>
                <div className="page-container">
                  <h2 className='add-item-heading'>My Items</h2>
                  <ItemContainer />
                </div>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab className='tab-content' eventKey='my-history' title='Borrowing History'>
          <UserHistoryPage />
        </Tab>
      </Tabs>
    </>
  )
}

export default MyItemsPage
