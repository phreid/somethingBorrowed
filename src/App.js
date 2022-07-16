import { Routes, Route } from 'react-router-dom'

import MyItemsPage from './components/MyItemsPage'
import MarketplacePage from './components/MarketplacePage'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/ProfilePage'
import LogoutPage from './components/LogoutPage'
import UserHistoryPage from './components/UserHistoryPage'

import './styles.css'

function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/my-items" element={<MyItemsPage />} />
        <Route path="/my-history" element={<UserHistoryPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </>
  )
}

export default App
