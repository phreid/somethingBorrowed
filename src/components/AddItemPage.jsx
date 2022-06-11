import React, { useState } from 'react';

import AddItemForm from './AddItemForm';

import '../styles.css';
import ItemContainer from "./ItemContainer";

function AddItemPage(){


    return(
        <>
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
