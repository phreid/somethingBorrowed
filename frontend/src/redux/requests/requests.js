import { createSlice } from '@reduxjs/toolkit'
import { getAllRequestsAsync, addRequestAsync, deleteRequestAsync, acceptRequestAsync, deleteNotAcceptedRequestAsync } from './thunks'

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
      .addCase(deleteNotAcceptedRequestAsync.fulfilled, (state, action) => {
        console.log('delete remaining')
      })
      .addCase(acceptRequestAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex(item => item._id === action.payload._id)
        state.list[index].status = action.payload.status
      })
  }
})

export const { addRequest } = requestsSlice.actions
export default requestsSlice.reducer
