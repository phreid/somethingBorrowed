import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true
const URL = 'http://localhost:4000/auth'

export const loginAsync = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }) => {
    const response = await axios.post(`${URL}/login`, { username, password })
    return response.data.result
  }
)
