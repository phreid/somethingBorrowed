import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './components/auth/LoginPage'
import LogoutPage from './components/auth/LogoutPage'
import MarketplacePage from './components/marketplace/MarketplacePage'
import MyItemsPage from './components/my-items/MyItemsPage'
import ProfilePage from './components/profile/ProfilePage'
import PendingRequests from './components/requests/PendingRequests'

import './styles.css'

function PrivateRoute ({ children }) {
  const user = useSelector(state => state.user)

  return user.isLoggedIn
    ? (<>{children}</>)
    : (<Navigate replace={true} to={'/'}/>)
}

function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/requests' element={<PrivateRoute><PendingRequests /></PrivateRoute>} />
        <Route path='/my-items' element={<PrivateRoute><MyItemsPage /></PrivateRoute>} />
        <Route path='/marketplace' element={<PrivateRoute><MarketplacePage /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path='/logout' element={<PrivateRoute><LogoutPage /></PrivateRoute>} />
        <Route
          path='*'
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
