import { createSlice } from '@reduxjs/toolkit'
import { baseItems } from './state'

const INITIAL_STATE = {
  list: baseItems
}

const itemSlice = createSlice({
  name: 'items',
  initialState: INITIAL_STATE,
  reducers: {}
})

export default itemSlice.reducer
