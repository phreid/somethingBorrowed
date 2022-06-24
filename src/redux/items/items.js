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
    },
    updateStatus: (state, action) => {
      const index = state.items.findIndex(item => item.name === action.payload.name)
      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          { ...state.items[index], status: 'Borrowed' },
          ...state.items.slice(index + 1)
        ]
      }
    },
    closeModal: (state, action) => {
      const index = state.items.findIndex(item => item.name === action.payload.name)
      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          { ...state.items[index], show: false },
          ...state.items.slice(index + 1)
        ]
      }
    }
  }
})

export const { addItem, deleteItem, updateStatus, closeModal } = itemSlice.actions
export default itemSlice.reducer
