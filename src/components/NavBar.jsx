import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import {LinkContainer} from 'react-router-bootstrap'
import { Routes, Route, Outlet, Link } from "react-router-dom";

import AddItemPage from './AddItemPage';
import App from '../App';

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
              <Link to="home">Home</Link>
              <Link to="addItem">Add Item To Profile</Link>
         </Container>
      </Navbar>
            </>
    )
}
