import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true
const URL = 'http://localhost:4000/auth'
const USERS = 'http://localhost:4000/users'

export const loginAsync = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }) => {
    const response = await axios.post(`${URL}/login`, { username, password })
    return response.data.result
  }
)

export const loggedInAsync = createAsyncThunk(
  'user/loggedInUser',
  async ({ username }) => {
    const response = await axios.get(`${URL}/login`, { username })
    return response.data.result
  }
)

export const getAllUsersAsync = createAsyncThunk(
  'user/getAllUsers',
  async () => {
    const response = await axios.get(USERS)
    console.log('thunk')
    console.log(response)
    return response.data.result
  }
)
