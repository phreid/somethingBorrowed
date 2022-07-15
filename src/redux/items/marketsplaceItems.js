import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import cricut from '../../images/cricut.jpg'
import { applyFiltersAsync, noFilterAsync, getAllItemsAsync } from './thunks'
const items = require('./items')

const INITIAL_STATE = {
	list: []
  }
export const marketplaceItems = createSlice({
  name: 'itemCards',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(noFilterAsync.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(applyFiltersAsync.fulfilled, (state, action) => {
        state.list = action.payload
      })
  }
})

export const { noFilter, applyFilters } = marketplaceItems.actions
export default marketplaceItems.reducer
