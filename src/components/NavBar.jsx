import React from 'react';

import '../styles.css';

function NavBar() {

  return (
    <>
    <div className="navBar">
    <nav>
            <a href="App.js" id="navItem">Home</a>
            <a href="AddItemPage.jsx" id="navItem">Add Item To Profile</a>
            </nav>
    </div>
    </>
  );
}

export default NavBar;