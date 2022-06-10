import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddItemPage from "./components/AddItemPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <AddItemPage />
  </React.StrictMode>
);

