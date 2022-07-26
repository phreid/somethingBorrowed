import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ITEM_TYPES } from '../../constants'

axios.defaults.withCredentials = true
const URL = 'http://localhost:4000'

export const loginAsync = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/auth/login`, { username, password })
      return response.data.result
    } catch (error) {
      if (!error.response) { throw error }
      return rejectWithValue({
        status: error.response.status
      })
    }
  }
)

export const signUpAsync = createAsyncThunk(
  'user/signUpUser',
  async ({ username, password, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/users`, {
        username,
        password,
        email,
        location: ITEM_TYPES.UBC_CAMPUS
      })
      return response.data.result
    } catch (error) {
      if (!error.response) { throw error }
      return rejectWithValue({
        status: error.response.status
      })
    }
  }
)

export const getCurrentUserAsync = createAsyncThunk(
  'user/getCurrentUser',
  async (userId) => {
    const response = await axios.get(`${URL}/users/${userId}`)
    return response.data.result
  }
)

export const getUserHistoryAsync = createAsyncThunk(
  'user/getHistory',
  async (userId) => {
    const response = await axios.get(`${URL}/users/${userId}/history`)
    return response.data.result
  }
)

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (updatedUser) => {
    const response = await axios.patch(`${URL}/users/${updatedUser.userId}`, updatedUser)
    return response.data.result
  }
)

export const deleteUserAsync = createAsyncThunk(
  'user/deleteUser',
  async (userId) => {
    const response = await axios.delete(`${URL}/users/${userId}`)
    return response.data.result
  }
)

export const logoutAsync = createAsyncThunk(
  'user/logoutUser',
  async () => {
    const response = await axios.post(`${URL}/auth/logout`)
    return response.data
  }
)
