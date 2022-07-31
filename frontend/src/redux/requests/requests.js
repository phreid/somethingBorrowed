import { createSlice } from '@reduxjs/toolkit'
import { getAllRequestsAsync } from './thunks'

const INITIAL_STATE = {
  list: []
}

export const requestsSlice = createSlice({
  name: 'items',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRequestsAsync.fulfilled, (state, action) => {
        state.list = action.payload
      })
  }
})

export const { addRequest } = requestsSlice.actions
export default requestsSlice.reducer
