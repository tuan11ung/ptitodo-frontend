import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
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
    showActiveCard: (state) => {
      state.isShowModalActiveCard = true
    },
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowModalActiveCard = false
    }
  }
})

// Danh cho component con goi len thay doi du lieu
export const { updateCurrentActiveCard, clearCurrentActiveCard, showActiveCard } = activeCardSlice.actions

// Danh cho component con goi len de lay du lieu
export const activeCardSelector = (state) => {
  return state.activeCard.currentActiveCard
}

export const showActiveCardSelector = (state) => {
  return state.activeCard.isShowModalActiveCard
}

export default activeCardSlice.reducer