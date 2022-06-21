import React from 'react';

import AddItemForm from './AddItemForm';
import ItemContainer from "./ItemContainer";
import NavBar from './NavBar';

import '../styles.css';

function AddItemPage(){


    return(
        <>
        <NavBar currpage="UserHome"/>
            <h1 className="page-title">Add Item to Profile</h1>
            <div className="grid-container">
                <div className="grid-child page-container">
                    <AddItemForm />
                </div>
                <div className="grid-child page-container" id="container-border">
                    <ItemContainer />
                </div>
            </div>
        </>
    )
}

export default AddItemPage;
