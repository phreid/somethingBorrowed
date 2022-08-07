import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './redux/store'
import { LoadScript } from '@react-google-maps/api'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LoadScript googleMapsApiKey = 'AIzaSyA9yd1CN0Yp-sCIQWev2S3fYZBrIwinrL8' >
          <App />
        </LoadScript>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
