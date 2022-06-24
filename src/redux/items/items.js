import { createSlice } from '@reduxjs/toolkit'
import { baseItems } from './state'
import { nanoid } from 'nanoid'

export const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: baseItems
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push({ id: nanoid(11), ...action.payload })
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name)
    },
    updateStatus: (state, action) => {
      const index = state.items.findIndex(item => item.name === action.payload.name)
      state.items[index].status = 'Borrowed'
    }
  }
})

export const { addItem, deleteItem, updateStatus } = itemSlice.actions
export default itemSlice.reducer
