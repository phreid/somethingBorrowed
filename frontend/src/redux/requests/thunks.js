import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true
const URL_BASE = 'api/requests'

export const getAllRequestsAsync = createAsyncThunk(
  'items/getAllRequests',
  async () => {
    const response = await axios.get(URL_BASE)
    return response.data.result
  }
)

export const addRequestAsync = createAsyncThunk(
  'items/addRequest',
  async (request) => {
    const response = await axios.post(URL_BASE, request)
    return response.data.result
  }
)

export const deleteRequestAsync = createAsyncThunk(
  'items/deleteRequest',
  async (request) => {
    const response = await axios.delete(`${URL_BASE}/${request.id}`)
    return response.data.result
  }
)

export const acceptRequestAsync = createAsyncThunk(
  'items/acceptRequest',
  async (request) => {
    const response = await axios.post(`${URL_BASE}/${request.id}/accept`)
    return response.data.result
  }
)
