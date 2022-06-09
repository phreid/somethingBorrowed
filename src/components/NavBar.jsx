import React, { useState, useEffect } from 'react';
import logo from '../logo.png'
import '../index.css';
import {updateNavItem} from '../actions/actionsSD'
import {useSelector, useDispatch} from 'react-redux';
import NavBarItems from './NavBarItems';


export default function NavBar(prop) {
    return <div className='navBar' key={prop.currPage}>
            <img src={logo} className="App-logo" alt="logo"/>
            <NavBarItems className="navBarItems" currPage={prop.currPage}/>
            <br></br>
        </div>;
}