import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './items/items'
import userReducer from './users/user'

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    user: userReducer
  },
  devTools: true
})
