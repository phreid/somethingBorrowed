import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  username: localStorage.getItem('user'),
  isLoggedIn: 'user' in localStorage
}

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    loginUser: (state, action) => {
      state.username = action.payload.username
      state.isLoggedIn = true
    }
  }
})

export const { loginUser } = userSlice.actions
export default userSlice.reducer
