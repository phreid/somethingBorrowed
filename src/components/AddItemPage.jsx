import React, { useState } from 'react';
import '../styles.css';
import ItemContainer from "./ItemContainer";

function AddItemPage(){


    return(
        <>
            <div className="grid-child page-container" id="container-border">
                <ItemContainer />
            </div>
        </>
    )
}

export default AddItemPage;