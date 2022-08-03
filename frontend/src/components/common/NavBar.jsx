import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { PersonCircle } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUserAsync } from '../../redux/users/thunks'
import navbarLogo from '../../images/navbarLogo.svg'

import '../../styles.css'

export default function NavBar () {
  const userId = useSelector(state => state.user.user)
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUserAsync(userId))
  }, [dispatch, userId])

  return (
    <Navbar bg="light" expand="lg">
      <Container className="navbar" fluid>
        <Navbar.Brand as={NavLink} to="/marketplace">
          <img
            alt=""
            src={navbarLogo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{' '}
          Something Borrowed</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/marketplace">Marketplace</Nav.Link>
            <Nav.Link as={NavLink} to="/my-items">My Items</Nav.Link>
            <Nav.Link as={NavLink} to="/requests">Requests</Nav.Link>
            <NavDropdown
              title={
                <span>
                  <PersonCircle className='me-1'/>
                  {currentUser.username}
                </span>}>
              <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
              <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
