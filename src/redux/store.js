import { configureStore } from '@reduxjs/toolkit'
import itemReducer from './items/items'
import userReducer from './users/user'

export const store = configureStore({
  reducer: {
    items: itemReducer,
    user: userReducer
  },
  devTools: true
})
