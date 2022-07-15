import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './items/items'
import userReducer from './users/user'
import marketsplaceItemsReducer from './items/marketsplaceItems'
export const store = configureStore({
  reducer: {
    items: itemsReducer,
    user: userReducer,
	m: marketsplaceItemsReducer
  },
  devTools: true
})
