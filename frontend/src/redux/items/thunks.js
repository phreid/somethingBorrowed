import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true
const URL_BASE = '/items'

export const getItemsAsync = createAsyncThunk(
  'items/getItems',
  async (queryParams) => {
    const params = new URLSearchParams(queryParams)

    for (const [key, value] of [...params.entries()]) {
      if (value === 'undefined') {
        params.delete(key)
      }
    }
    const URL_END = queryParams ? `?${params.toString()}` : ''

    const response = await axios.get(URL_BASE + URL_END)
    return response.data.result
  }
)

export const getOneItemAsync = createAsyncThunk(
  'items/getOneItem',
  async (item) => {
    const response = await axios.get(`${URL_BASE}/${item.id}`)
    return response.data.result
  }
)

export const addItemAsync = createAsyncThunk(
  'items/addItem',
  async (item) => {
    const response = await axios.post(URL_BASE, item)
    return response.data.result
  }
)

export const deleteItemAsync = createAsyncThunk(
  'items/deleteItem',
  async (item) => {
    const response = await axios.delete(`${URL_BASE}/${item.id}`)
    return response.data.result
  }
)

export const updateItemAsync = createAsyncThunk(
  'items/updateItem',
  async (item) => {
    const response = await axios.patch(`${URL_BASE}/${item.id}`, item)
    return response.data.result
  }
)

export const borrowItemAsync = createAsyncThunk(
  'items/borrowItem',
  async (item) => {
    const response = await axios.post(`${URL_BASE}/${item.id}/borrow`)
    return response.data.result
  }
)

export const rateItemAsync = createAsyncThunk(
  'items/rateItem',
  async (item) => {
    const response = await axios.post(`${URL_BASE}/${item.id}/rating`, item)
    return response.data.result
  }
)
