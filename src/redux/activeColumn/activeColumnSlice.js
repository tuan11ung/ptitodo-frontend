import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { isEmpty } from 'lodash'

import { API_ROOT } from '~/utils/constants'

import { mapOrder } from '~/utils/sorts'
import { generatePlaceholderCard } from '~/utils/formatters'

export const createNewColumnAPI = createAsyncThunk(
  'activeColumn/createNewColumnAPI',
  async (newColumnData) => {
    const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
    return response.data
  }
)

const initialState = {
  currentActiveColumn: null
}

export const activeColumnSlice = createSlice({
  name: 'activeColumn',
  initialState,
  reducers: {
    updateCurrentActiveColumn: (state, action) => {
      const column = action.payload

      // Xu li logic

      state.currentActiveColumn = column
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createNewColumnAPI.fulfilled, (state, action) => {
      let column = action.payload


      state.currentActiveBoard = column
    })
  }
})

// Danh cho component con goi len thay doi du lieu
export const { updateCurrentActiveColumn } = activeColumnSlice.actions

// Danh cho component con goi len de lay du lieu
export const activeColumnSelector = (state) => {
  return state.activeColumn.currentActiveColumn
}

export default activeColumnSlice.reducer