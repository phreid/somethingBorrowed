import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true
const URL_BASE = '/requests'

export const getAllRequestsAsync = createAsyncThunk(
  'items/getAllRequests',
  async () => {
    const response = await axios.get(URL_BASE)
    return response.data.result
  }
)
