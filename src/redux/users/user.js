import { createSlice } from '@reduxjs/toolkit'
import { loginAsync } from './thunks'

const INITIAL_STATE = {
  username: localStorage.getItem('user'),
  isLoggedIn: 'user' in localStorage
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
  }
})

export const { loginUser } = userSlice.actions
export default userSlice.reducer
