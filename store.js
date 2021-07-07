import { configureStore } from '@reduxjs/toolkit'
import matchesReducer from './src/features/matches/matchesSlice'

export default configureStore({
  reducer: {
    matches: matchesReducer,
  },
})
