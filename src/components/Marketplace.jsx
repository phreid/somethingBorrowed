import React from 'react';
import NavBar from "./NavBar";
import '../styles.css';
import SearchContainer from './SearchContainer';
import ItemContainer from './ItemContainer';

function Marketplace(){


    return(
        <>
        <NavBar currPage="Marketplace"/>
            <h1 className="page-title">Marketplace</h1>
            <div className="grid-container">
                <div className="Marketplace-search">
                    <SearchContainer/>
                </div>
                <div className="Marketplace-items">
                    <ItemContainer/>
                </div>
            </div>

        </>
    )
}

export default Marketplace;
