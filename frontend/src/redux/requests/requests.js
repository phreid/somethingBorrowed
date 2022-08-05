import { createSlice } from '@reduxjs/toolkit'
import { REQUEST_STATUS } from '../../constants'
import { getAllRequestsAsync, addRequestAsync, deleteRequestAsync, acceptRequestAsync } from './thunks'

const INITIAL_STATE = {
  list: []
}

export const requestsSlice = createSlice({
  name: 'requests',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRequestsAsync.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(addRequestAsync.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(deleteRequestAsync.fulfilled, (state, action) => {
        state.list = state.list.filter(request => request._id !== action.payload._id)
      })
      .addCase(acceptRequestAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex(request => request._id === action.payload._id)
        state.list[index].status = action.payload.status
        state.list = state.list.filter(request => !(request.item._id === action.payload.item._id && request.status === REQUEST_STATUS.PENDING))
      })
  }
})

export const { addRequest } = requestsSlice.actions
export default requestsSlice.reducer
