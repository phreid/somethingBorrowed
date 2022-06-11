import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import '../styles.css';

export default function NavBar(prop) {
    return (
   <>
      <Navbar className="navbar-parent">
          <Container>
            <Navbar.Brand href="#home">
                  <img
                    src="image"
                    width="30"
                    height="30"
                    className="App-logo"
                    alt="Something Borrowed"
                  />
              </Navbar.Brand>
          </Container>
          <Container>
              <Nav.Link to="home">Home</Nav.Link>
              <Nav.Link to="addItem">Add Item To Profile</Nav.Link>
         </Container>
      </Navbar>
    </>
    )
}