import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
<<<<<<< HEAD
  username: localStorage.getItem('user'),
  isLoggedIn: 'user' in localStorage
=======
  username: '',
  isLoggedIn: false
>>>>>>> b82c9b2897c171018e34d62e647f4959c7c5c251
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
