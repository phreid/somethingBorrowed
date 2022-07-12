import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true
const URL = 'http://localhost:4000/items'

export const getAllItemsAsync = createAsyncThunk(
  'items/getAllItems',
  async () => {
    const response = await axios.get(URL)
    return response.data.result
  }
)

export const getOneItemAsync = createAsyncThunk(
  'items/getOneItem',
  async (item) => {
    const response = await axios.get(`${URL}/${item.id}`)
    return response.data.result
  }
)

export const addItemAsync = createAsyncThunk(
  'items/addItem',
  async (item) => {
    const response = await axios.post(URL, item)
    return response.data.result
  }
)

export const deleteItemAsync = createAsyncThunk(
  'items/deleteItem',
  async (item) => {
    const response = await axios.delete(`${URL}/${item.id}`)
    return response.data.result
  }
)

export const updateItemAsync = createAsyncThunk(
  'items/updateItem',
  async (item) => {
    console.log('thunk status: ' + item.status)
    const response = await axios.patch(`${URL}/${item.id}`, item)
    return response.data.result
  }
)

export const borrowItemAsync = createAsyncThunk(
  'items/borrowItem',
  async (item) => {
    const response = await axios.post(`${URL}/${item.id}/borrow`)
    return response.data.result
  }
)

export const returnItemAsync = createAsyncThunk(
  'items/returnItem',
  async (item) => {
    console.log('hits return thunk')
    console.log(item)
    const response = await axios.post(`${URL}/${item.id}/return`)
    return response.data.result
  }
)

// export const borrowItemAsync = createAsyncThunk(
//   'items/borrowItem',
//   async (item) => {
//     console.log('borrow thunk')
//     console.log(item)
//     const response = await axios.patch(`${URL}/${item.id}`, item)
//     return response.data.result
//   }
// )

export const setItemReturnedAsync = createAsyncThunk(
  'items/updateItem',
  async (item) => {
    const response = await axios.patch(`${URL}/${item.id}`, item)
    return response.data.result
  }
)

export const setItemUnavailableAsync = createAsyncThunk(
  'items/updateItem',
  async (item) => {
    const response = await axios.patch(`${URL}/${item.id}`, item)
    return response.data.result
  }
)

export const setItemAvailableAsync = createAsyncThunk(
  'items/updateItem',
  async (item) => {
    const response = await axios.patch(`${URL}/${item.id}`, item)
    return response.data.result
  }
)
