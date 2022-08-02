import { createSlice } from '@reduxjs/toolkit'
import { rateItemAsync, getItemsAsync, addItemAsync, deleteItemAsync, updateItemAsync, borrowItemAsync } from './thunks'

const INITIAL_STATE = {
  list: []
}

export const itemSlice = createSlice({
  name: 'items',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItemsAsync.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.list = state.list.filter(item => item._id !== action.payload._id)
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex(item => item._id === action.payload._id)
        state.list[index] = action.payload
      })
      .addCase(borrowItemAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex(item => item._id === action.payload._id)
        state.list[index].status = action.payload.status
      })
      .addCase(rateItemAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex(item => item._id === action.payload._id)
        state.list[index].rating = action.payload.rating
        state.list[index].ratingComments = action.payload.ratingComments
      })
  }
})

export const { addItem, deleteItem, updateStatus, editItem } = itemSlice.actions
export default itemSlice.reducer
