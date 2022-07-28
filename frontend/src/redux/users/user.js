import { createSlice } from '@reduxjs/toolkit'
import { rateItemAsync } from '../items/thunks'
import { deleteUserAsync, getCurrentUserAsync, getUserHistoryAsync, loginAsync, logoutAsync, updateUserAsync } from './thunks'

const INITIAL_STATE = {
  user: localStorage.getItem('user'),
  isLoggedIn: 'user' in localStorage,
  currentUser: {},
  userHistory: []
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
      .addCase(getUserHistoryAsync.fulfilled, (state, action) => {
        state.userHistory = action.payload
      })
      .addCase(rateItemAsync.fulfilled, (state, action) => {
        state.userHistory.forEach((record) => {
          if (record.item._id === action.payload._id) {
            record.item.rating = action.payload.rating
            record.item.ratingComments = action.payload.ratingComments
          }
        })
      })
  }
})

export const { loginUser } = userSlice.actions
export default userSlice.reducer
