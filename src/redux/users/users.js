import { createSlice } from '@reduxjs/toolkit'
import { getAllUsersAsync } from './thunks'

const INITIAL_STATE = {
  list: []
}

const usersSlice = createSlice({
  name: 'allUsers',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        console.log('reducer')
        console.log(action.payload)
        state.list = action.payload
        localStorage.setItem('users', action.payload)
      })
  }
})

export const { getAllUsers } = usersSlice.actions
export default usersSlice.reducer
