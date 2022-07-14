import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import '../styles.css'

export default function MyItemsNavBar () {
  return (
    <Navbar className="my-items-navbar" bg="light" expand="lg">
      <Container className="my-items-container" fluid>
        <Nav className='m-auto'>
          <Nav.Link as={NavLink} to="/my-items">My Items</Nav.Link>
          <Nav.Link as={NavLink} to="/my-history">Borrowing History</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
