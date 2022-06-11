import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import AddItemPage from "./components/AddItemPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AddItemPage />
  </React.StrictMode>
);

