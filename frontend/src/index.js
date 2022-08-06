import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './redux/store'

import './index.css'
import { LoadScript } from '@react-google-maps/api'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LoadScript googleMapsApiKey = {process.env.REACT_APP_MAPS_API_KEY} >
          <App />
        </LoadScript>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
