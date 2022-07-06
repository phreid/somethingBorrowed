import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './items/items'
import userReducer from './users/user'
// import usersReducer from './users/users'

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    user: userReducer
    // users: usersReducer
  },
  devTools: true
})
