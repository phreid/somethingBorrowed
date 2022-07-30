import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import '../../styles.css'

export default function NavBar () {
  return (
    <Navbar bg="light" expand="lg">
      <Container className="navbar" fluid>
        <Navbar.Brand as={NavLink} to="/marketplace">Something Borrowed</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/marketplace">Marketplace</Nav.Link>
            <Nav.Link as={NavLink} to="/my-items">My Items</Nav.Link>
            <Nav.Link as={NavLink} to="/requests">Requests</Nav.Link>
            <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
            <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
