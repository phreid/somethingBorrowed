import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from './items/items'
import userReducer from './users/user'

export const store = configureStore({
  reducer: {
    itemsSlice,
    user: userReducer
  },
  devTools: true
})
