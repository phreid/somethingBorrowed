import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import HomePage from './routes/HomePage'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import UserHome from './routes/UserHome'
import MarketplacePage from './routes/MarketplacePage'
import AddItemPage from './components/AddItemPage'
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddItemPage />} />
            <Route path="HomePage" element={<HomePage />} />
            <Route path="UserHome" element={<UserHome />} />
            <Route path="Marketplace" element={<MarketplacePage />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
