import { createSlice } from '@reduxjs/toolkit'
import { getCurrentUserAsync, loginAsync, logoutAsync } from './thunks'

const INITIAL_STATE = {
  currentUserId: localStorage.getItem('user'),
  isLoggedIn: 'user' in localStorage,
  currentUser: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.currentUserId = action.payload
        state.isLoggedIn = true
        localStorage.setItem('user', action.payload)
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.currentUserId = null
        state.isLoggedIn = false
        localStorage.removeItem('user')
      })
  }
})

export const { loginUser } = userSlice.actions
export default userSlice.reducer
