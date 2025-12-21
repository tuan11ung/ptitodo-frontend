import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCard: null
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    updateCurrentActiveCard: (state, action) => {
      const card = action.payload

      // Xu li logic

      state.currentActiveCard = card
    },
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    }
  }
})

// Danh cho component con goi len thay doi du lieu
export const { updateCurrentActiveCard, clearCurrentActiveCard } = activeCardSlice.actions

// Danh cho component con goi len de lay du lieu
export const activeCardSelector = (state) => {
  return state.activeCard.currentActiveCard
}

export default activeCardSlice.reducer