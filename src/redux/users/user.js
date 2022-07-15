import { createSlice } from '@reduxjs/toolkit'
import { deleteUserAsync, getCurrentUserAsync, loginAsync, logoutAsync, updateUserAsync } from './thunks'

const INITIAL_STATE = {
  user: localStorage.getItem('user'),
  isLoggedIn: 'user' in localStorage,
  currentUser: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoggedIn = true
        localStorage.setItem('user', action.payload)
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.currentUserId = null
        state.isLoggedIn = false
        localStorage.removeItem('user')
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.user = null
        state.isLoggedIn = false
        localStorage.removeItem('user')
      })
  }
})

export const { loginUser } = userSlice.actions
export default userSlice.reducer
