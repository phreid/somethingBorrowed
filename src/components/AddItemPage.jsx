import React, { useState } from 'react';

import AddItemForm from './AddItemForm';
import NavBar from './NavBar';

import '../styles.css';

function AddItemPage(){


    return(
        <>
        <NavBar />
        <h1 className="page-title">Add Item to Profile</h1>
        <div className="grid-container">
            <div className="grid-child page-container">
                <AddItemForm />
            </div>
            <div className="grid-child page-container">
                <AddItemForm />
            </div>
        </div>
        </>
    )
}

export default AddItemPage;