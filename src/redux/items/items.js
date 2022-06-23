import { createSlice } from '@reduxjs/toolkit'
import { baseItems } from './state'

export const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: baseItems
  },
  reducers: {
    addItem: (state, action) => {
      return { ...state, items: [action.payload, ...state.items] }
    },
    deleteItem: (state, action) => {
      const items = state.items.filter(item => item.name !== action.payload.name)
      return { ...state, items: [...items] }
    }
  }
})

export const { addItem, deleteItem } = itemSlice.actions
export default itemSlice.reducer
