import { Routes, Route } from 'react-router-dom'

import LoginPage from './components/auth/LoginPage'
import LogoutPage from './components/auth/LogoutPage'
import MarketplacePage from './components/marketplace/MarketplacePage'
import MyItemsPage from './components/my-items/MyItemsPage'
import ProfilePage from './components/profile/ProfilePage'
import PendingRequests from './components/requests/PendingRequests'

import './styles.css'

function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/requests" element={<PendingRequests />} />
        <Route path="/my-items" element={<MyItemsPage />} />
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
