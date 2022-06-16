import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  username: '',
  isLoggedIn: false
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
