import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './items/items'
import userReducer from './users/user'
import requestsReducer from './requests/requests'

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    user: userReducer,
    requests: requestsReducer
  },
  devTools: true
})
