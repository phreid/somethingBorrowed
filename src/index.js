import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { store } from './redux/store'
import { Provider } from 'react-redux'
import Marketplace from './components/Marketplace'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Marketplace />
    </Provider>
  </React.StrictMode>
)
