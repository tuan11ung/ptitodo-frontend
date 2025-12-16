import { configureStore } from '@reduxjs/toolkit'
import activeBoardReducer from './activeBoard/activeBoardSlice'
import activeColumnReducer from './activeColumn/activeColumnSlice'

export const store = configureStore({
  reducer: {
    activeBoard: activeBoardReducer,
    activeColumn: activeColumnReducer
  }
})
