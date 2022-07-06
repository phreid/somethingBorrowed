import { createSlice } from '@reduxjs/toolkit'
import { loginAsync, getAllUsersAsync } from './thunks'

const INITIAL_STATE = {
  username: localStorage.getItem('user'),
  isLoggedIn: 'user' in localStorage,
  list: []
}

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.username = action.payload
        state.isLoggedIn = true
        localStorage.setItem('user', action.payload)
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.list = action.payload
      })
  }
})

export const { loginUser, getAllUsers } = userSlice.actions
export default userSlice.reducer
