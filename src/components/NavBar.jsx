import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';


import '../styles.css';



export default function NavBar(prop) {
    return (
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
               <Nav className="navbar-links">
                  <NavLink className="navBarItemsBox" href="#home">Home</NavLink>
                  <NavLink className="navBarItemsBox" href="#link">Link</NavLink>
             </Nav>
         </Container>
      </Navbar>
    )
}
